"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";

export default function PresenceBadge() {
    const { emotionalState } = useTheme();

    const colors: Record<string, string> = {
        worst: "bg-blue-400",
        neutral: "bg-stone-400",
        progressing: "bg-rose-400",
        thriving: "bg-emerald-400",
    };

    const glowColors: Record<string, string> = {
        worst: "shadow-[0_0_10px_rgba(96,165,250,0.5)]",
        neutral: "shadow-[0_0_10px_rgba(168,162,158,0.5)]",
        progressing: "shadow-[0_0_10px_rgba(251,113,133,0.5)]",
        thriving: "shadow-[0_0_10px_rgba(52,211,153,0.5)]",
    };

    return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-1.5 h-1.5 rounded-full ${colors[emotionalState]} ${glowColors[emotionalState]}`}
            />
            <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Present</span>
        </div>
    );
}
