"use client";

import { useUniverse } from "./UniverseProvider";
import { motion } from "framer-motion";

export function NarrativeCard() {
    const universe = useUniverse();
    if (!universe) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm max-w-md w-full"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-white/40 uppercase">Current Phase</span>
                <span className="text-xs font-mono text-emerald-400/80 uppercase tracking-widest">
                    {universe.narrative.phase.replace("THE_", "")}
                </span>
            </div>

            <h3 className="text-xl font-serif text-white/90 mb-2">
                {universe.narrative.title}
            </h3>

            <p className="text-sm text-white/60 leading-relaxed font-light">
                {universe.narrative.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-xs text-white/30 italic text-center">
                    &quot;{universe.resonance}&quot;
                </p>
            </div>
        </motion.div>
    );
}
