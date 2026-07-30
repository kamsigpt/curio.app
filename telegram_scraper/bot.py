import asyncio
import re
import os
import json
from datetime import datetime

import aiohttp
from bs4 import BeautifulSoup
from telegram import Bot, InputMediaPhoto
from telegram.error import TelegramError

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "config.json")
DATA_PATH = os.path.join(os.path.dirname(__file__), "posted_links.json")

def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)

def load_posted():
    try:
        with open(DATA_PATH) as f:
            return set(json.load(f))
    except (FileNotFoundError, json.JSONDecodeError):
        return set()

def save_posted(links):
    with open(DATA_PATH, "w") as f:
        json.dump(list(links), f, indent=2)

def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

async def fetch_page(session, url):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/125.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "en-US,en;q=0.9",
    }
    try:
        async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=30)) as resp:
            if resp.status != 200:
                print(f"[{resp.status}] {url}")
                return None
            return await resp.text()
    except Exception as e:
        print(f"Fetch error: {url} — {e}")
        return None

def parse_courses(html, config):
    courses = []
    soup = BeautifulSoup(html, "html.parser")

    for card in soup.select(config["card_selector"]):
        try:
            title_el = card.select_one(config["title_selector"])
            link_el = card.select_one(config["link_selector"])
            price_el = card.select_one(config["price_selector"]) if config.get("price_selector") else None
            image_el = card.select_one(config["image_selector"]) if config.get("image_selector") else None
            desc_el = card.select_one(config["desc_selector"]) if config.get("desc_selector") else None

            title = clean_text(title_el.text) if title_el else None
            link = link_el.get("href") if link_el else None
            if link and not link.startswith("http"):
                link = config["base_url"].rstrip("/") + "/" + link.lstrip("/")
            price = clean_text(price_el.text) if price_el else None
            image = image_el.get("src") if image_el else None
            if image and not image.startswith("http"):
                image = config["base_url"].rstrip("/") + "/" + image.lstrip("/")
            desc = clean_text(desc_el.text)[:200] if desc_el else None

            if title and link:
                courses.append({
                    "title": title,
                    "url": link,
                    "price": price,
                    "image": image,
                    "description": desc,
                })
        except Exception as e:
            print(f"Parse error on card: {e}")
            continue

    return courses

def build_message(course):
    parts = [f"<b>{course['title']}</b>"]
    if course.get("price"):
        parts.append(f"💰 <b>Price:</b> {course['price']}")
    if course.get("description"):
        parts.append(f"📝 {course['description']}")
    parts.append(f"🔗 <a href='{course['url']}'>View Course</a>")
    return "\n\n".join(parts)

async def post_course(bot, chat_id, course):
    msg = build_message(course)
    try:
        if course.get("image"):
            await bot.send_photo(
                chat_id=chat_id,
                photo=course["image"],
                caption=msg,
                parse_mode="HTML",
            )
        else:
            await bot.send_message(chat_id=chat_id, text=msg, parse_mode="HTML", disable_web_page_preview=True)
        return True
    except TelegramError as e:
        print(f"Telegram post error: {e}")
        return False

async def run():
    config = load_config()
    posted = load_posted()

    bot = Bot(token=config["bot_token"])
    chat_id = config["chat_id"]

    async with aiohttp.ClientSession() as session:
        html = await fetch_page(session, config["scrape_url"])
        if not html:
            print("No HTML fetched.")
            return

        courses = parse_courses(html, config)
        print(f"Found {len(courses)} courses ({len(posted)} already posted)")

        new = 0
        for course in courses:
            if course["url"] in posted:
                continue
            ok = await post_course(bot, chat_id, course)
            if ok:
                posted.add(course["url"])
                new += 1
                await asyncio.sleep(2)

        save_posted(posted)
        print(f"Posted {new} new course(s).")

def main():
    asyncio.run(run())

if __name__ == "__main__":
    main()
