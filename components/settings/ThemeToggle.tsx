"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
    const { mode, setMode } = useTheme();

    function toggle() {
        const next = mode === "dark" ? "light" : "dark";
        setMode(next);
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(next);
    }

    return (
        <button
            onClick={toggle}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all"
        >
            {mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
    );
}
