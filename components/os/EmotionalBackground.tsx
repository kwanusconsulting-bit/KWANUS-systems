"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function EmotionalBackground() {
    const { emotionalState }: any = useTheme();

    const colors: any = {
        worst: "from-blue-900/40 via-blue-800/20 to-black",
        neutral: "from-stone-700/30 via-stone-600/10 to-black",
        progressing: "from-rose-700/30 via-rose-600/10 to-black",
        thriving: "from-emerald-700/30 via-emerald-600/10 to-black",
    };

    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <div className={`absolute inset-0 bg-gradient-to-br ${colors[emotionalState] || colors.neutral} transition-all duration-1000 ease-in-out`} />
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
            <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
        </div>
    );
}
