import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["\"Avenir Next\"", "\"PingFang SC\"", "\"Hiragino Sans GB\"", "\"Noto Sans SC\"", "sans-serif"],
        mono: ["\"SFMono-Regular\"", "\"IBM Plex Mono\"", "\"Menlo\"", "\"Monaco\"", "\"Courier New\"", "monospace"]
      },
      colors: {
        border: "hsl(210 20% 88%)",
        input: "hsl(210 20% 88%)",
        ring: "hsl(196 100% 46%)",
        background: "hsl(42 33% 98%)",
        foreground: "hsl(217 33% 12%)",
        primary: {
          DEFAULT: "hsl(196 100% 46%)",
          foreground: "hsl(0 0% 100%)"
        },
        secondary: {
          DEFAULT: "hsl(50 100% 94%)",
          foreground: "hsl(217 33% 12%)"
        },
        muted: {
          DEFAULT: "hsl(40 28% 95%)",
          foreground: "hsl(214 17% 35%)"
        },
        accent: {
          DEFAULT: "hsl(24 92% 60%)",
          foreground: "hsl(0 0% 100%)"
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(217 33% 12%)"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)",
        glow: "0 20px 80px rgba(6, 182, 212, 0.16)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
