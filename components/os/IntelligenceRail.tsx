"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { GlassPanel, PersonaText } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "@/hooks/useKernel";

export default function IntelligenceRail() {
    const { kernel } = useKernel();
    const { emotionalState, personaMode }: any = useTheme();

    const [message, setMessage] = useState("Synchronizing Consciousness...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (kernel) {
            setMessage(kernel.predictive?.insight || "Consciousness active.");
            setLoading(false);
        }
    }, [kernel]);

    const personaVoices: Record<string, string> = {
        soft: "Himalaya whispers:",
        balanced: "Your OS notes:",
        direct: "Kai signals:",
    };

    const glow: Record<string, string> = {
        worst: "border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        neutral: "border-stone-400/30 shadow-[0_0_20px_rgba(168,162,158,0.15)]",
        progressing: "border-rose-400/30 shadow-[0_0_20px_rgba(244,114,182,0.15)]",
        thriving: "border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    };

    const icons: Record<string, string> = {
        worst: "🌊",
        neutral: "⚖️",
        progressing: "🔥",
        thriving: "✨",
    };

    return (
        <div className="w-full px-4 mb-4">
            <GlassPanel
                className={`
          w-full py-2.5 px-6 flex items-center justify-between overflow-hidden relative
          transition-all duration-1000 ease-out border-white/10
          ${glow[emotionalState] || glow.neutral}
        `}
            >
                {/* Living pulse background */}
                <motion.div
                    animate={{
                        opacity: [0.02, 0.05, 0.02],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white pointer-events-none"
                />

                <div className="flex items-center gap-3 w-full relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={message}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 flex-1"
                        >
                            <span className="text-sm shrink-0">{icons[emotionalState] || "✨"}</span>
                            <PersonaText className={`text-[11px] font-medium tracking-wide truncate persona-${personaMode}-color`}>
                                <span className="opacity-40 mr-2 font-bold uppercase tracking-[0.2em]">
                                    {personaVoices[personaMode]}
                                </span>
                                {loading ? "Calculating insights..." : message}
                            </PersonaText>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {loading && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full relative z-10"
                    />
                )}
            </GlassPanel>
        </div>
    );
}
