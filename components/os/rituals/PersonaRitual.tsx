"use client";

import { motion } from "framer-motion";

export default function PersonaRitual({ data }: { data?: any }) {
    const mode = data?.mode || "Himalaya";

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <motion.div
                className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl"
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring" }}
            >
                {mode === "Kai" ? "⚡" : "🏔️"}
            </motion.div>
            <div className="text-center">
                <motion.h2
                    className="text-xl font-bold text-white tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Attuning to {mode}
                </motion.h2>
                <motion.p
                    className="text-xs text-white/40 italic mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Recalibrating tone and pacing...
                </motion.p>
            </div>
        </div>
    );
}
