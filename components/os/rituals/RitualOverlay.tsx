"use client";

import { motion } from "framer-motion";

interface RitualOverlayProps {
    type: string;
    children: React.ReactNode;
}

export default function RitualOverlay({ type, children }: RitualOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-ritual-type={type}
            className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center"
        >
            {/* Ambient Background Pulse */}
            <motion.div
                className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
                animate={{
                    backgroundColor: ["rgba(0,0,0,0)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            <div className="relative z-10 w-full max-w-2xl px-8">
                {children}
            </div>
        </motion.div>
    );
}
