import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getTelegramUpdates() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?limit=50`;
  const res = await fetch(url);
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
  return text.match(urlRegex) ?? [];
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

async function ensureInstructor() {
  const name = "Curio Community";
  const { data } = await supabase.from("instructors").select("id").eq("name", name).maybeSingle();
  if (data) return data.id;
  const { data: inserted } = await supabase
    .from("instructors")
    .insert({
      name,
      headline: "Curated free courses from Telegram",
      avatar_url: "",
      bio: "Community-approved free courses shared daily.",
    })
    .select("id")
    .single();
  return inserted?.id;
}

function parseDuration(text) {
  const match = text.match(/(\d+)\s*(hour|hr|h)/i);
  return match ? Number.parseInt(match[1]) : 1;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function run() {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set - skipping");
    return;
  }

  console.log(`Fetching Telegram updates for chat ${CHAT_ID}...`);
  const updates = await getTelegramUpdates();
  console.log(`Got ${updates.length} total updates`);

  if (updates.length > 0) {
    const first = updates[0];
    console.log("First update raw (chat info):", JSON.stringify({
      update_id: first.update_id,
      chat_id: first.message?.chat?.id,
      chat_type: first.message?.chat?.type,
      chat_title: first.message?.chat?.title,
      message_id: first.message?.message_id,
      text_preview: (first.message?.text ?? first.message?.caption ?? "").slice(0, 100),
    }));
  }

  const chatIds = [...new Set(updates.map((u) => u.message?.chat?.id?.toString()).filter(Boolean))];
  console.log(`Chats found in updates: ${JSON.stringify(chatIds)}`);
  console.log(`Your TELEGRAM_CHAT_ID secret: ${CHAT_ID}`);

  let messages = updates
    .map((u) => ({ id: u.message.message_id, text: u.message.text ?? u.message.caption ?? "", chat_id: u.message?.chat?.id }))
    .filter((m) => m.text);

  if (CHAT_ID) {
    messages = messages.filter((m) => m.chat_id?.toString() === CHAT_ID);
  }

  console.log(`Found ${messages.length} text messages from ${CHAT_ID ? `chat ${CHAT_ID}` : "any group"}`);

  const { data: existingCourses } = await supabase.from("courses").select("slug");
  const existingSlugs = new Set(existingCourses?.map((c) => c.slug) ?? []);
  console.log(`Existing courses in DB: ${existingSlugs.size}`);

  const categoryId = await ensureCategory("other", "Other");
  const instructorId = await ensureInstructor();
  console.log(`Using category: ${categoryId}, instructor: ${instructorId}`);

  let inserted = 0;

  for (const msg of messages) {
    const urls = extractUrls(msg.text);
    if (urls.length === 0) continue;

    for (const url of urls) {
      await sleep(500);
      console.log(`Processing: ${url}`);
      const og = await fetchOgTags(url);
      const title = og.title || og["og:title"] || url.split("/").pop()?.replace(/[-_]/g, " ") || "Untitled Course";
      const slug = slugify(title);
      if (!slug || existingSlugs.has(slug)) continue;

      const catSlug = detectCategory(msg.text, og);
      const catId = catSlug !== "other"
        ? await ensureCategory(catSlug, catSlug.charAt(0).toUpperCase() + catSlug.slice(1))
        : categoryId;

      const course = {
        slug,
        title: title.slice(0, 255),
        subtitle: (og.description || og["og:description"] || "").slice(0, 500),
        description: (og.description || og["og:description"] || ""),
        thumbnail_url: og.image || og["og:image"] || "",
        provider: "Telegram",
        external_url: url,
        instructor_id: instructorId,
        category_id: catId,
        level: "All Levels",
        language: "English",
        price: 0,
        original_price: 0,
        rating: 0,
        rating_count: 0,
        student_count: 0,
        duration_hours: parseDuration(msg.text),
        lecture_count: 0,
        bestseller: false,
        is_new: true,
        tags: `{free,telegram,${catSlug}}`,
        what_you_will_learn: "{}",
        requirements: "{}",
        curriculum: "[]",
      };

      const { error } = await supabase.from("courses").insert(course);
      if (error) {
        console.error(`Insert error for "${title}":`, error.message);
      } else {
        existingSlugs.add(slug);
        inserted++;
        console.log(`Inserted: ${title}`);
      }
    }
  }

  console.log(`Done. ${inserted} new courses added.`);
}
