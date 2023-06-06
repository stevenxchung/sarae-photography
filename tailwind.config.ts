import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
