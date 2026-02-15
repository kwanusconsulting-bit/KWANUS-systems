"use client";

import { GlassPanel, PersonaText, SectionTitle } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useKernel } from "@/hooks/useKernel";


export default function TimelinePreview() {
    const { kernel, loading } = useKernel();
    const events = kernel?.timeline?.slice(0, 5) || [];

    return (
        <GlassPanel className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <SectionTitle>Recent Activity</SectionTitle>
                <Link
                    href="/timeline"
                    className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                    View Full →
                </Link>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse h-12 w-full bg-white/5 rounded-xl" />
                            ))}
                        </div>
                    ) : events.length > 0 ? (
                        <div className="space-y-3">
                            {events.map((e: any, idx: number) => (
                                <motion.div
                                    key={e.id || idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 relative group hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm shrink-0 border border-white/5">
                                        {e.type === 'milestone' ? '🏆' : e.type === 'emotional' ? '🧠' : '⚡'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <PersonaText className="text-[11px] font-bold text-white/80 truncate">
                                            {e.title}
                                        </PersonaText>
                                        <PersonaText className="text-[10px] text-white/40 line-clamp-1">
                                            {e.message}
                                        </PersonaText>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <PersonaText className="text-white/20 italic">
                                The timeline is clear.
                            </PersonaText>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </GlassPanel>
    );
}
