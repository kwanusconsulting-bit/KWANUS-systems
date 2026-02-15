"use client";

import { GlassPanel, GlassButton, PersonaText } from "@/components/ui";
import { motion } from "framer-motion";

export default function StepComplete() {
    const enterOS = () => {
        // Cinematic redirection
        window.location.href = "/dashboard";
    };

    return (
        <GlassPanel className="w-full text-center space-y-8 p-8 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <div className="space-y-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-16 h-16 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                >
                    <span className="text-2xl">✨</span>
                </motion.div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        The Ritual is Complete.
                    </h1>
                    <PersonaText className="text-white/60 italic">
                        Your financial universe is now synchronized.
                    </PersonaText>
                </div>

                <p className="text-slate-400 text-sm italic font-serif max-w-[280px] mx-auto leading-relaxed">
                    &quot;Welcome to KWANUS OS. I’ll guide you from here.&quot;
                </p>
            </div>

            <GlassButton
                onClick={enterOS}
                className="w-full py-4 text-lg bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all"
            >
                Enter OS Vessel
            </GlassButton>
        </GlassPanel>
    );
}
