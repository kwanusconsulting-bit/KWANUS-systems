"use client";

import { motion } from "framer-motion";

export default function TransitionRitual() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
                className="w-1 h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.span
                className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                Shifting Resonance
            </motion.span>
        </div>
    );
}
