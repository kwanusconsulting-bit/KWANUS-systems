"use client";

import { motion } from "framer-motion";

export default function EmotionalRitual({ data }: { data?: any }) {
    const state = data?.state || "Neutral";

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <motion.div
                className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <span className="text-4xl">🧘</span>
            </motion.div>
            <div className="text-center">
                <motion.h2
                    className="text-2xl font-black uppercase tracking-tighter text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {state} Calibration
                </motion.h2>
                <motion.p
                    className="text-[10px] uppercase tracking-[0.5em] text-white/40 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Adapting Universe Flow
                </motion.p>
            </div>
        </div>
    );
}
