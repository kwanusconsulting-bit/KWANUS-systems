import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                // Emotional theming hooks – we’ll wire real palettes later
                surface: {
                    base: "#050510",
                    soft: "#0B0B1A",
                    bright: "#111122"
                },
                accent: {
                    primary: "#7C3AED",
                    soft: "#A855F7",
                    glow: "#22D3EE"
                }
            },
            borderRadius: {
                xl: "1.25rem"
            },
            boxShadow: {
                "glass-soft": "0 18px 45px rgba(0,0,0,0.55)"
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-up": {
                    "0%": { opacity: "0", transform: "translateY(12px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "pulse-soft": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.6" },
                },
                glowPulse: {
                    "0%, 100%": { opacity: "0.6", filter: "blur(32px)" },
                    "50%": { opacity: "1", filter: "blur(40px)" },
                },
                breathe: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.03)" },
                },
                drift: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-6px)" },
                    "100%": { transform: "translateY(0px)" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.4s ease-out",
                "slide-up": "slide-up 0.4s ease-out",
                "scale-in": "scale-in 0.3s ease-out",
                "pulse-soft": "pulse-soft 2s ease-in-out infinite",
                glowPulse: "glowPulse 6s ease-in-out infinite",
                breathe: "breathe 8s ease-in-out infinite",
                drift: "drift 5s ease-in-out infinite",
            },
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ]
};

export default config;
