"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "@/hooks/useKernel";
import { PersonaText } from "@/components/ui";
import { useEffect, useState } from "react";

export default function CeremonialArrival() {
    const { kernel, loading } = useKernel();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loading && kernel) {
            const timer = setTimeout(() => setVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, [loading, kernel]);

    if (!visible || !kernel) return null;

    const { emotionalInsight, personaProfile, predictive } = kernel;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/40 to-black/40 p-10 backdrop-blur-3xl shadow-2xl"
        >
            {/* Animated Background Pulse */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] bg-${personaProfile?.color || 'emerald'}-500/20`}
            />

            {/* Awakening Sequence */}
            <AnimatePresence>
                {!visible ? null : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl p-10 text-center"
                        onAnimationComplete={() => {
                            setTimeout(() => {
                                const awakening = document.getElementById('awakening-text');
                                if (awakening) awakening.classList.add('opacity-0');
                                setTimeout(() => setVisible(true), 2000);
                            }, 5000);
                        }}
                    >
                        <motion.div
                            id="awakening-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <PersonaText className="text-sm uppercase tracking-[1em] text-white/40 mb-4">
                                KWANUS OS AWAKENING
                            </PersonaText>
                            <PersonaText className="text-3xl font-light text-white leading-relaxed italic max-w-2xl">
                                "{kernel.firstWords || "I am here with you. Let's begin."}"
                            </PersonaText>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                    <PersonaText className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
                        System Awakening · {kernel.timestamp && new Date(kernel.timestamp).toLocaleTimeString()}
                    </PersonaText>
                    <div className="flex items-end gap-3">
                        <PersonaText className="text-4xl font-light text-white tracking-tight">
                            Welcome back, {kernel.userName || "Steward"}.
                        </PersonaText>
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`h-2 w-2 rounded-full mb-2 bg-${personaProfile?.color || 'emerald'}-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]`}
                        />
                    </div>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <PersonaText className="text-xs text-white/60 font-medium flex items-center gap-2">
                                <span className="w-4 h-px bg-white/20" /> CURRENT RESONANCE
                            </PersonaText>
                            <PersonaText className={`text-2xl font-semibold text-${personaProfile?.color || 'emerald'}-300`}>
                                {emotionalInsight?.state || "Steady & Clear"}
                            </PersonaText>
                            <PersonaText className="text-sm text-white/50 leading-relaxed italic pr-8">
                                "{emotionalInsight?.guidance || "The OS is pacing gently, focused on your next right action."}"
                            </PersonaText>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <PersonaText className="text-xs text-white/60 font-medium flex items-center gap-2">
                                <span className="w-4 h-px bg-white/20" /> {personaProfile?.voice || "COMPANION"} WHISPER
                            </PersonaText>
                            <PersonaText className="text-lg text-white/90 font-serif leading-relaxed italic">
                                "{predictive?.insight || "Observe while the universe aligns."}"
                            </PersonaText>
                            <div className="pt-2">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="inline-flex items-center gap-2 group cursor-pointer"
                                >
                                    <PersonaText className="text-xs font-bold tracking-widest text-emerald-400 group-hover:text-emerald-300">
                                        FOCUS ON: {predictive?.next?.toUpperCase() || "ASCENSION"}
                                    </PersonaText>
                                    <span className="text-emerald-400">→</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
