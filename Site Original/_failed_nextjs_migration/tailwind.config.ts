import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                bg: "var(--bg)",
                accent: "var(--accent)",
                secondary: "var(--secondary)",
            },
            fontFamily: {
                sans: ["var(--font-plus-jakarta)", "sans-serif"],
                display: ["var(--font-space-grotesk)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
