// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          700: "var(--color-primary-700)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      borderRadius: { xl: "var(--radius)" },
      boxShadow: { soft: "var(--shadow)" },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        abhaya: ["var(--font-abhaya)", "serif"],
        hywenhei: ["var(--font-hywenhei)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
