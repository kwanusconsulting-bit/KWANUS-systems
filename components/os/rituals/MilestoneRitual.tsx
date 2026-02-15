"use client";

import { motion } from "framer-motion";

export default function MilestoneRitual({ data }: { data?: any }) {
    const title = data?.title || "Threshold Reached";

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <motion.div
                    className="absolute inset-0 bg-white/20 blur-3xl rounded-full"
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center text-5xl relative z-10 bg-black">
                    ✨
                </div>
            </motion.div>
            <div className="text-center space-y-2">
                <motion.h2
                    className="text-4xl font-black uppercase tracking-tighter text-white italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {title}
                </motion.h2>
                <motion.div
                    className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: 128 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
                <motion.p
                    className="text-sm font-medium text-white/60 tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    The universe acknowledges your momentum.
                </motion.p>
            </div>
        </div>
    );
}
