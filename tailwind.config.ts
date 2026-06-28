import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: "#27F5D6",
          50: "#EEFFFB",
          100: "#D7FFF6",
          200: "#B6F7F0",
          300: "#84F2E3",
          400: "#4FF8DE",
          500: "#27F5D6",
          600: "#10CDB2",
          700: "#0BA391",
          800: "#0B7C70",
          900: "#0C5950",
        },
        aqua: {
          DEFAULT: "#00C9FF",
          400: "#3FD4FF",
          500: "#00C9FF",
          600: "#0099C9",
        },
        sky: "#B6F7F0",
        cool: {
          DEFAULT: "#64748B",
          50: "#F8FAFC",
          100: "#F1F5F9",
          400: "#94A3B8",
          500: "#64748B",
          700: "#3F4B5E",
        },
        ink: "#0A1A1F",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 8px 30px -8px rgba(39, 245, 214, 0.45)",
        card: "0 2px 8px -2px rgba(10, 26, 31, 0.08), 0 1px 2px rgba(10,26,31,0.04)",
        cardHover: "0 16px 32px -12px rgba(10, 26, 31, 0.18)",
        glass: "0 18px 60px -28px rgba(10, 26, 31, 0.35), inset 0 1px 0 rgba(255,255,255,0.85)",
      },
      backgroundImage: {
        "mint-aqua": "linear-gradient(135deg, #27F5D6 0%, #00C9FF 100%)",
        glass: "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.42))",
        "liquid-mint": "radial-gradient(circle at 20% 15%, rgba(39,245,214,0.32), transparent 28%), radial-gradient(circle at 86% 12%, rgba(0,201,255,0.18), transparent 24%), linear-gradient(135deg, #ffffff 0%, #f6fffd 45%, #eefcff 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        floaty2: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(8px, 0, 0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translate3d(0, 16px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-33.333%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        floaty2: "floaty2 7s ease-in-out infinite",
        drift: "drift 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        scroll: "scroll 30s linear infinite",
        "scroll-right": "scroll-right 50s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
