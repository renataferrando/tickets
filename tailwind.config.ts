import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom-light': '0px 10px 20px rgba(0, 0, 0, 0.3)',
        'custom-dark': '0px 20px 40px rgba(0, 0, 0, 0.5)',
      },
      perspective: {
        '1200': '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
