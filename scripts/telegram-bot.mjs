import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "";
const THUMB_BUCKET = process.env.SUPABASE_THUMBNAIL_BUCKET ?? "course-thumbnails";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
let bucketReady = false;

async function getTelegramUpdates() {
  const url = new URL(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
  url.searchParams.set("limit", "50");
  url.searchParams.set("allowed_updates", JSON.stringify(["message", "channel_post"]));
  const res = await fetch(url.toString());
  const json = await res.json();
  if (!json.ok) throw new Error(`Telegram API error: ${JSON.stringify(json)}`);
  return json.result ?? [];
}

async function fetchOgTags(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; CurioBot/1.0)" },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const og = {};
    const metaRegex = /<meta\s+(?:property|name)=["'](og:|twitter:)?([^"']+)["']\s+content=["']([^"']+)["']/gi;
    let match;
    while ((match = metaRegex.exec(html)) !== null) {
      og[match[2].toLowerCase()] = match[3];
    }
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (!og.title && titleMatch) og.title = titleMatch[1].trim();
    return og;
  } catch {
    return {};
  }
}

function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s,]+/g;
  return (text.match(urlRegex) ?? []).map((url) => url.replace(/[).,\]]+$/, ""));
}

function extractEntityUrls(text, entities = []) {
  return entities.flatMap((entity) => {
    if (entity.type === "text_link" && entity.url) return [entity.url];
    if (entity.type !== "url" || typeof entity.offset !== "number" || typeof entity.length !== "number") return [];
    return [text.slice(entity.offset, entity.offset + entity.length)];
  });
}

function extractButtonUrls(replyMarkup) {
  return (replyMarkup?.inline_keyboard ?? [])
    .flatMap((row) => row)
    .flatMap((button) => [button.url, button.login_url?.url, button.web_app?.url])
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function isCurioOrTelegramUrl(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    return host === "t.me" || host === "telegram.me" || host.endsWith(".t.me") || host === "curio.app";
  } catch {
    return false;
  }
}

function pickCourseUrl(message, text) {
  const urls = unique([
    ...extractButtonUrls(message.reply_markup),
    ...extractButtonUrls(message.reply_to_message?.reply_markup),
    ...extractUrls(text),
    ...extractEntityUrls(message.text ?? "", message.entities),
    ...extractEntityUrls(message.caption ?? "", message.caption_entities),
  ]);
  return urls.find((url) => !isCurioOrTelegramUrl(url)) ?? urls[0] ?? "";
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function detectCategory(text, og) {
  const combined = `${text} ${og.title ?? ""} ${og.description ?? ""}`.toLowerCase();
  if (/\b(design|figma|ui|ux|graphic|illustrat|photoshop|adobe|canva)\b/.test(combined)) return "design";
  if (/\b(develop|program|code|python|javascript|react|node|web|app|software|data|ai|machine)\b/.test(combined)) return "development";
  if (/\b(marketing|seo|social media|ads|content|brand)\b/.test(combined)) return "marketing";
  if (/\b(business|entrepreneur|startup|finance|invest|accounting)\b/.test(combined)) return "business";
  if (/\b(photo|video|edit|production|animation)\b/.test(combined)) return "photography";
  if (/\b(fitness|health|wellness|yoga|meditation|nutrition)\b/.test(combined)) return "health";
  if (/\b(music|guitar|piano|sing|dance|art|draw)\b/.test(combined)) return "music";
  return "other";
}

async function ensureCategory(slug, name) {
  const { data } = await supabase.from("categories").select("id").eq("slug", slug).maybeSingle();
  if (data) return data.id;
  const { data: inserted } = await supabase
    .from("categories")
    .insert({ slug, name, icon: "BookOpen" })
    .select("id")
    .single();
  return inserted?.id;
}

async function ensureInstructor(name = "Curio Community") {
  const { data } = await supabase.from("instructors").select("id").eq("name", name).maybeSingle();
  if (data) return data.id;
  const { data: inserted } = await supabase
    .from("instructors")
    .insert({
      name,
      headline: name === "Curio Community" ? "Curated free courses from Telegram" : "Course instructor",
      avatar_url: "",
      bio: "Community-approved free courses shared daily.",
    })
    .select("id")
    .single();
  return inserted?.id;
}

function parseDuration(text) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(hours?|hrs?|h)\b/i);
  return match ? Number.parseFloat(match[1]) : 0;
}

function parseLectureCount(text) {
  const match = text.match(/(\d[\d,]*)\s*(lectures?|lessons?)\b/i);
  return match ? Number.parseInt(match[1].replace(/,/g, ""), 10) : 0;
}

function parseRating(text) {
  const ratingMatch = text.match(/rating:\s*(\d(?:\.\d+)?)/i) ?? text.match(/(?:⭐|★)\s*(\d(?:\.\d+)?)/);
  const countMatch = text.match(/\((\d[\d,]*)\s*reviews?\)/i);
  return {
    rating: ratingMatch ? Number.parseFloat(ratingMatch[1]) : 0,
    rating_count: countMatch ? Number.parseInt(countMatch[1].replace(/,/g, ""), 10) : 0,
  };
}

function parseLastUpdated(text) {
  const mdy = text.match(/last\s+updated:\s*(\d{1,2})\/(\d{1,2})\/(\d{2,4})/i);
  if (mdy) {
    const month = Number.parseInt(mdy[1], 10);
    const day = Number.parseInt(mdy[2], 10);
    let year = Number.parseInt(mdy[3], 10);
    if (year < 100) year += 2000;
    if (month < 1 || month > 12 || day < 1 || day > 31) return "";
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00.000Z`;
  }
  const my = text.match(/last\s+updated:\s*(\d{1,2})\/(\d{2,4})/i);
  if (my) {
    const month = Number.parseInt(my[1], 10);
    let year = Number.parseInt(my[2], 10);
    if (year < 100) year += 2000;
    if (month < 1 || month > 12) return "";
    return `${year}-${String(month).padStart(2, "0")}-01T00:00:00.000Z`;
  }
  const long = text.match(/last\s+updated:\s*(\w+)\s+(\d{1,2}),?\s*(\d{4})/i);
  if (long) {
    const months = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };
    const month = months[long[1].toLowerCase().slice(0, 3)];
    const day = Number.parseInt(long[2], 10);
    const year = Number.parseInt(long[3], 10);
    if (!month || day < 1 || day > 31) return "";
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00.000Z`;
  }
  return "";
}

function parseInstructorName(text) {
  const match = text.match(/instructor:\s*([^\n]+)/i);
  if (!match) return "Curio Community";
  return stripUrls(match[1])
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "Curio Community";
}

function stripUrls(text) {
  return text.replace(/https?:\/\/\S+/g, "").trim();
}

function stripHash(text) {
  return text.replace(/^#/, "").replace(/[^\w-]+/g, "_").replace(/^_+|_+$/g, "");
}

function extractTags(text) {
  const tags = text.match(/#[\p{L}\p{N}_-]+/gu) ?? [];
  return unique(tags.map(stripHash).filter(Boolean)).slice(0, 8);
}

function isDetailLine(line) {
  return /(\d+(?:\.\d+)?\s*(hours?|hrs?|h)\b|\d+\s*(lectures?|lessons?)\b|coupon uses|rating:|last updated:|instructor:|limited\s+free|freecourses|udemy|learning|enroll now|get premium course)/i.test(line);
}

function cleanLine(line) {
  return stripUrls(line)
    .replace(/[“”]/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCourseText(text, og, courseUrl) {
  const lines = text
    .split(/\r?\n/)
    .map(cleanLine)
    .filter(Boolean);
  const contentLines = lines.filter((line) => !/^#/.test(line) && !isDetailLine(line));
  let fallbackTitle = "Untitled Course";
  try {
    const parsedUrl = new URL(courseUrl);
    fallbackTitle = parsedUrl.pathname.split("/").filter(Boolean).pop()?.replace(/[-_]/g, " ") || parsedUrl.hostname;
  } catch {
    fallbackTitle = courseUrl.split("/").filter(Boolean).pop()?.replace(/[-_]/g, " ") || fallbackTitle;
  }
  const title = (contentLines[0] || og.title || og["og:title"] || fallbackTitle)
    .replace(/\s+\|\s*Curio$/i, "")
    .slice(0, 255);
  const subtitleLine = contentLines.find((line, index) => index > 0 && line.length > 12);
  const ogDescription = og.description || og["og:description"] || "";
  const subtitle = (subtitleLine || ogDescription || title).slice(0, 500);
  const description = (contentLines.slice(1).join("\n\n") || ogDescription || subtitle).slice(0, 4000);
  const provider = /udemy/i.test(`${text} ${courseUrl}`) ? "Udemy" : /coursera/i.test(`${text} ${courseUrl}`) ? "Coursera" : "Telegram";
  const rating = parseRating(text);
  const tags = extractTags(text);

  return {
    title,
    subtitle,
    description,
    provider,
    instructorName: parseInstructorName(text),
    duration_hours: parseDuration(text),
    lecture_count: parseLectureCount(text),
    updated_at: parseLastUpdated(text),
    tags: tags.length ? tags : ["free"],
    ...rating,
  };
}

async function ensureThumbnailBucket() {
  if (bucketReady) return true;
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) return false;
  if (!buckets?.some((bucket) => bucket.name === THUMB_BUCKET)) {
    const { error } = await supabase.storage.createBucket(THUMB_BUCKET, { public: true });
    if (error) return false;
  }
  bucketReady = true;
  return true;
}

function getLargestPhoto(message) {
  return [...(message.photo ?? [])].sort((a, b) => (b.file_size ?? 0) - (a.file_size ?? 0))[0];
}

async function uploadTelegramPhoto(message, slug) {
  const photo = getLargestPhoto(message);
  if (!photo?.file_id || !BOT_TOKEN) return "";

  try {
    if (!(await ensureThumbnailBucket())) return "";

    const fileRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${encodeURIComponent(photo.file_id)}`);
    const fileJson = await fileRes.json();
    if (!fileJson.ok || !fileJson.result?.file_path) return "";

    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileJson.result.file_path}`;
    const imageRes = await fetch(fileUrl);
    if (!imageRes.ok) return "";

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const extension = fileJson.result.file_path.split(".").pop() || "jpg";
    const path = `telegram/${slug}-${photo.file_unique_id ?? Date.now()}.${extension}`;
    const body = Buffer.from(await imageRes.arrayBuffer());
    const { error } = await supabase.storage.from(THUMB_BUCKET).upload(path, body, {
      contentType,
      upsert: true,
    });
    if (error) return "";
    return supabase.storage.from(THUMB_BUCKET).getPublicUrl(path).data.publicUrl ?? "";
  } catch {
    return "";
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function run() {
  if (!BOT_TOKEN) {
    console.log("TELEGRAM_BOT_TOKEN not set - skipping");
    return;
  }

  if (!CHAT_ID) {
    console.log("TELEGRAM_CHAT_ID not set - will process messages from all chats");
  }

  await cleanupNewFlags();

  console.log(`Fetching Telegram updates for chat ${CHAT_ID}...`);
  const updates = await getTelegramUpdates();
  console.log(`Got ${updates.length} total updates`);

  console.log(`${updates.length} total updates`);

  for (const u of updates.slice(0, 5)) {
    const type = u.message ? "message" : u.channel_post ? "channel_post" : u.my_chat_member ? "my_chat_member" : "other";
    const chat = u.message?.chat ?? u.channel_post?.chat ?? u.my_chat_member?.chat ?? {};
    console.log(`  [${type}] chat_id=${chat.id} chat_type=${chat.type} title="${chat.title ?? ""}"`);
  }

  const messageUpdates = updates.filter((u) => u.message || u.channel_post);
  console.log(`Messages + channel posts: ${messageUpdates.length}`);

  let messages = messageUpdates
    .map((u) => {
      const m = u.message ?? u.channel_post;
      return {
        id: m.message_id,
        update_id: u.update_id,
        text: m.text ?? m.caption ?? "",
        chat_id: m.chat?.id,
        raw: m,
      };
    })
    .filter((m) => m.text || m.raw?.photo?.length || m.raw?.reply_markup);

  if (CHAT_ID) {
    messages = messages.filter((m) => m.chat_id?.toString() === CHAT_ID);
  }

  console.log(`Found ${messages.length} text messages from ${CHAT_ID ? `chat ${CHAT_ID}` : "any group"}`);

  if (messages.length > 0) {
    console.log(`First message preview: "${messages[0].text.slice(0, 200)}"`);
    console.log(`First message URLs: ${JSON.stringify([pickCourseUrl(messages[0].raw, messages[0].text)].filter(Boolean))}`);
  }

  const { data: existingCourses } = await supabase.from("courses").select("slug, external_url");
  const existingSlugs = new Set(existingCourses?.map((c) => c.slug) ?? []);
  const existingUrls = new Set(existingCourses?.map((c) => c.external_url).filter(Boolean) ?? []);
  console.log(`Existing courses in DB: ${existingSlugs.size}`);

  const categoryId = await ensureCategory("other", "Other");
  console.log(`Using fallback category: ${categoryId}`);

  let inserted = 0;

  let skippedNoUrls = 0;
  for (const msg of messages) {
    const url = pickCourseUrl(msg.raw, msg.text);
    if (!url) { skippedNoUrls++; continue; }
    if (existingUrls.has(url)) { console.log(`Skipped existing URL: ${url}`); continue; }

    await sleep(500);
    console.log(`Processing one course from message ${msg.id}: ${url}`);
    const og = await fetchOgTags(url);
    const parsed = parseCourseText(msg.text, og, url);
    const slug = slugify(parsed.title);
    console.log(`  title="${parsed.title}" slug="${slug}" og_keys=${Object.keys(og).join(",")}`);
    if (!slug || existingSlugs.has(slug)) { console.log(`  -> skipped (slug conflict or empty)`); continue; }

    const catSlug = detectCategory(msg.text, og);
    const catId = catSlug !== "other"
      ? await ensureCategory(catSlug, catSlug.charAt(0).toUpperCase() + catSlug.slice(1))
      : categoryId;
    const instructorId = await ensureInstructor(parsed.instructorName);
    const uploadedThumb = await uploadTelegramPhoto(msg.raw, slug);
    const thumbnailUrl = uploadedThumb || og.image || og["og:image"] || og["twitter:image"] || "";

    const course = {
      slug,
      title: parsed.title,
      subtitle: parsed.subtitle,
      description: parsed.description,
      thumbnail_url: thumbnailUrl,
      provider: parsed.provider,
      external_url: url,
      instructor_id: instructorId,
      category_id: catId,
      level: "All Levels",
      language: "English",
      price: 0,
      original_price: 0,
      rating: parsed.rating,
      rating_count: parsed.rating_count,
      student_count: 0,
      duration_hours: parsed.duration_hours,
      lecture_count: parsed.lecture_count,
      bestseller: false,
      is_new: true,
      tags: unique(["free", catSlug, ...parsed.tags]),
      what_you_will_learn: [],
      requirements: [],
      curriculum: [],
      ...(parsed.updated_at ? { updated_at: parsed.updated_at } : {}),
    };

    const { error } = await supabase.from("courses").insert(course);
    if (error) {
      console.error(`Insert error for "${parsed.title}":`, error.message);
    } else {
      existingSlugs.add(slug);
      existingUrls.add(url);
      inserted++;
      console.log(`Inserted: ${parsed.title}`);
    }
  }

  console.log(`Done. ${inserted} new courses added. (${skippedNoUrls} messages had no URLs)`);
}

async function cleanupNewFlags() {
  const now = new Date();
  if (now.getUTCHours() !== 0) return;

  console.log("Midnight check: cleaning up old is_new flags...");
  const { data: flagged, error } = await supabase
    .from("courses")
    .select("id, created_at")
    .eq("is_new", true);

  if (error || !flagged?.length) {
    console.log(`  -> ${error ? error.message : "no courses to update"}`);
    return;
  }

  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  let updated = 0;

  for (const course of flagged) {
    const created = course.created_at ? new Date(course.created_at) : null;
    if (created && !Number.isNaN(created.getTime()) && created < cutoff) {
      const { error: updateError } = await supabase
        .from("courses")
        .update({ is_new: false })
        .eq("id", course.id);
      if (!updateError) updated++;
    }
  }

  console.log(`  -> ${updated} courses had is_new removed`);
}
