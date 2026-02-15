"use client";

import { GlassCard, PersonaText, SectionTitle, GlassBadge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "@/hooks/useKernel";

export default function NarrativePreview() {
    const { kernel, loading } = useKernel();
    const beats = kernel?.narrativeBeats || [];

    return (
        <GlassCard className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <SectionTitle>Your Story</SectionTitle>
                <GlassBadge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    Mythic Arc
                </GlassBadge>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse h-20 w-full bg-white/5 rounded-2xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {beats.map((e: any, idx: number) => (
                                <motion.div
                                    key={e.id || idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 relative group hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-1 h-full rounded-full bg-gradient-to-b from-rose-500/50 to-transparent" />
                                        <div className="text-lg">🎭</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <GlassBadge variant="soft" className="text-[9px]">{e.arc}</GlassBadge>
                                        </div>
                                        <PersonaText className="text-xs text-white/80 leading-relaxed font-serif italic">
                                            {e.message}
                                        </PersonaText>
                                    </div>
                                </motion.div>
                            ))}
                            {beats.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                                    <PersonaText className="text-white/40 italic">
                                        Your journey is beginning. Step forward to create your first story beat.
                                    </PersonaText>
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
                <PersonaText className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                    OS Narrative Core activated
                </PersonaText>
            </div>
        </GlassCard>
    );
}
