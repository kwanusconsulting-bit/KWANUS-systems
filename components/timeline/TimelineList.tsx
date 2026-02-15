"use client";

import { GlassPanel, SectionTitle, PersonaText, GlassBadge } from "@/components/ui";
import { motion } from "framer-motion";

interface TimelineEvent {
    id: string;
    title: string;
    message: string;
    type: string;
    createdAt: string;
}

export default function TimelineList({ events }: { events: TimelineEvent[] }) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'emotional': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
            case 'progress': return 'text-rose-400 border-rose-400/20 bg-rose-400/10';
            case 'milestone': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
            case 'insight': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
            default: return 'text-white/40 border-white/10 bg-white/5';
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <SectionTitle className="text-4xl">The Timeline</SectionTitle>
                    <PersonaText className="text-white/40 mt-2">A chronological record of your financial evolution.</PersonaText>
                </div>
                <GlassBadge className="px-4 py-1.5 bg-white/5 border-white/10">
                    {events.length} Recorded Moments
                </GlassBadge>
            </div>

            <div className="relative">
                {/* Central Spine */}
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent" />

                <div className="space-y-8">
                    {events.map((e, idx) => (
                        <motion.div
                            key={e.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex gap-8 group"
                        >
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all shadow-xl">
                                    <div className="w-3 h-3 rounded-full bg-white/20 group-hover:scale-125 transition-transform" />
                                </div>
                            </div>

                            <GlassPanel className="flex-1 p-6 hover:bg-white/5 transition-all border-white/5 hover:border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <GlassBadge className={`text-[9px] ${getTypeColor(e.type)}`}>
                                        {e.type.toUpperCase()}
                                    </GlassBadge>
                                    <span className="text-[10px] text-white/20 font-mono">
                                        {new Date(e.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {e.title}
                                </h3>
                                <p className="text-white/60 text-sm mt-1 leading-relaxed">
                                    {e.message}
                                </p>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 overflow-hidden pointer-events-none">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-4xl font-black italic">#{events.length - idx}</span>
                                    </div>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
