"use client";

import React from "react";
import { motion } from "framer-motion";
import { Construct } from "@/lib/constructs";
import { Persona } from "@/lib/persona";

interface TheCenterProps {
    construct: Construct;
    persona: Persona;
    gradients: any;
    className?: string;
}

export const TheCenter: React.FC<TheCenterProps> = ({
    construct,
    persona,
    gradients,
    className = "",
}) => {
    return (
        <div className={`relative flex flex-col items-center justify-center p-8 ${className}`}>
            {/* The Outer Orbit: Creation Signal Radiator */}
            <motion.div
                className="absolute inset-0 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* The Inner Halo: Identity Stabilizer */}
            <div className={`relative z-10 h-64 w-64 rounded-full border border-white/10 bg-slate-900/40 p-1 shadow-2xl backdrop-blur-2xl ring-1 ring-white/20`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradients.halo} opacity-10`} />

                <div className="flex h-full w-full flex-col items-center justify-center rounded-full text-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <p className={`text-[0.6rem] font-bold uppercase tracking-[0.3em] ${gradients.accent}`}>
                            {construct.status}
                        </p>
                        <h2 className="text-xl font-semibold text-slate-50 tracking-tight">
                            {persona.affirmation}
                        </h2>
                        <p className="text-[0.65rem] text-slate-400 italic leading-tight">
                            {persona.presence}
                        </p>
                    </motion.div>

                    {/* Operational Pulse */}
                    <div className="mt-6 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${gradients.accent.replace('text-', 'bg-')} animate-pulse`} />
                        <span className="text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest">
                            Signal: {construct.interactionRate.toFixed(2)} Hz
                        </span>
                    </div>
                </div>
            </div>

            {/* Functional Hooks: Pure Action Buttons */}
            <div className="mt-12 grid grid-cols-2 gap-4 z-20">
                {construct.functionality.slice(0, 2).map((func, i) => (
                    <motion.button
                        key={func}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/60 p-4 backdrop-blur-xl hover:border-white/20 transition-all text-center"
                    >
                        <p className={`text-[0.45rem] font-bold uppercase tracking-widest ${i === 0 ? gradients.accent : 'text-slate-500'}`}>
                            Action {i + 1}
                        </p>
                        <p className="text-[0.65rem] text-slate-200 mt-1 font-medium leading-tight">
                            {func}
                        </p>
                    </motion.button>
                ))}
            </div>

            {/* Subliminal Continuity Text */}
            <div className="absolute -bottom-16 text-center opacity-20 pointer-events-none">
                <p className="text-[0.45rem] uppercase font-bold tracking-[0.6em] text-white">
                    Forward is the only system
                </p>
            </div>
        </div>
    );
};
