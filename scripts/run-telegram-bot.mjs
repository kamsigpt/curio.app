import { run } from "./telegram-bot.mjs";

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
