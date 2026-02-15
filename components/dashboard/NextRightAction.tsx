"use client";

import { useEffect, useState } from "react";
import { GlassCard, PersonaText, GlassBadge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

export default function NextRightAction() {
    const [next, setNext] = useState("Scanning horizon...");
    const [loading, setLoading] = useState(true);
    const { emotionalState } = useTheme();

    useEffect(() => {
        async function fetchNext() {
            try {
                const res = await fetch("/api/intelligence/predict");
                const data = await res.json();
                setNext(data.next || "All current threads are stable.");
            } catch (e) {
                setNext("Waiting for signal...");
            } finally {
                setLoading(false);
            }
        }
        fetchNext();
    }, []);

    const accents: Record<string, string> = {
        worst: "text-blue-400",
        neutral: "text-stone-400",
        progressing: "text-rose-400",
        thriving: "text-emerald-400",
    };

    return (
        <GlassCard className="relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">Next Right Action</h2>
                <GlassBadge className={accents[emotionalState]}>Proactive</GlassBadge>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={next}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                >
                    <p className="text-xl text-white font-medium leading-relaxed">
                        {next}
                    </p>
                    <PersonaText className="text-xs text-white/40 mt-4 italic">
                        &quot;One intentional movement changes the geometry of the universe.&quot;
                    </PersonaText>
                </motion.div>
            </AnimatePresence>

            <div className={`absolute bottom-0 right-0 w-32 h-32 bg-current opacity-[0.03] blur-3xl rounded-full -mr-16 -mb-16 ${accents[emotionalState]}`} />
        </GlassCard>
    );
}
