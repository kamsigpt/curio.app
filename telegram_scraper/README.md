# Telegram Course Scraper Bot

Scrapes courses from any website and posts them to a Telegram channel.

## Setup

### 1. Get a Telegram Bot Token

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` and follow the prompts
3. BotFather will give you a token like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`
4. Copy that token into `config.json`

### 2. Get your Channel or Chat ID

- **Public channel**: use `@yourchannel` as the chat_id
- **Private chat**: message `@userinfobot` to get your numeric ID

### 3. Configure the Scraper

Edit `config.json`:

| Key | What to put |
|-----|-------------|
| `bot_token` | The token from BotFather |
| `chat_id` | `@yourchannel` or numeric ID |
| `scrape_url` | The page URL with course listings |
| `base_url` | The site's root domain |
| `card_selector` | CSS selector for each course block |
| `title_selector` | CSS selector for the course title inside the card |
| `link_selector` | CSS selector for the link element |
| `price_selector` | CSS selector for the price (optional) |
| `image_selector` | CSS selector for the image (optional) |
| `desc_selector` | CSS selector for the description (optional) |

**Tip**: To find the right selectors, open the site in Chrome, right-click a course card → Inspect, and find the HTML elements that wrap each course.

### 4. Install & Run

```bash
cd telegram_scraper
pip install -r requirements.txt
python bot.py
```

It will print how many courses it found and how many were newly posted.
Only new links are posted — already posted links are saved in `posted_links.json`.

### 5. Schedule it (optional)

Run every hour via cron (Linux/Mac) or Task Scheduler (Windows):

```bash
# crontab — every 4 hours
0 */4 * * * cd /path/to/telegram_scraper && python bot.py
```
