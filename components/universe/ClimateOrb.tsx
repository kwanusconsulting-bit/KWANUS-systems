"use client";

import { motion } from "framer-motion";
import { useUniverse } from "./UniverseProvider";

export function ClimateOrb() {
    const universe = useUniverse();
    const climate = universe?.climate?.type || "NEUTRAL";
    const intensity = universe?.climate?.intensity || 5;

    // Visual Mapping
    const getColors = (type: string) => {
        switch (type) {
            case "STORM": return "from-red-500/20 to-purple-900/40";
            case "RADIANCE": return "from-amber-300/20 to-orange-500/40";
            case "BLOOM": return "from-emerald-400/20 to-teal-600/40";
            case "VOID": return "from-gray-900/80 to-black/90";
            case "STILLNESS": return "from-blue-200/20 to-indigo-300/30";
            default: return "from-white/10 to-gray-500/10";
        }
    };

    const pulseDuration = 10 / (intensity || 1); // Higher intensity = Faster pulse

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* The Core */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full bg-gradient-to-br blur-2xl ${getColors(climate)}`}
            />

            {/* The Shell */}
            <div className="relative z-10 text-center">
                <h2 className="text-3xl font-light tracking-widest text-white/90">
                    {universe?.climate?.name || "Initializing..."}
                </h2>
                <div className="h-px w-12 bg-white/20 mx-auto my-2" />
                <p className="text-xs font-mono text-white/50 uppercase tracking-widest">
                    {universe?.continuity?.season?.replace("SEASON_OF_", "") || "Loading"}
                </p>
            </div>
        </div>
    );
}
