"use client";

import { useUniverse } from "../universe/UniverseProvider";
import { useState } from "react";
import { motion } from "framer-motion";

export function TuningPanel() {
    const universe = useUniverse();
    const [thresholds, setThresholds] = useState(universe?.system?.thresholds || { highIntensityThreshold: 8, lowIntensityThreshold: 3 });

    const handleTune = (key: string, value: number) => {
        setThresholds(prev => ({ ...prev, [key]: value }));
        // In a real app, this would call /api/steward/tune
        console.log(`[Steward] Tuning ${key} to ${value}`);
    };

    if (!universe) return <div>Accessing Core...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl"
        >
            <h3 className="text-white/80 font-mono text-xs uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                Steward Control Deck
            </h3>

            <div className="space-y-6">
                {/* High Intensity Threshold */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                        <span>Max Intensity Cap</span>
                        <span className="font-mono text-amber-400">{thresholds.highIntensityThreshold}</span>
                    </div>
                    <input
                        type="range"
                        min="5" max="10"
                        value={thresholds.highIntensityThreshold}
                        onChange={(e) => handleTune("highIntensityThreshold", parseInt(e.target.value))}
                        className="w-full accent-amber-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                </div>

                {/* Low Intensity Threshold */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                        <span>Rest State Floor</span>
                        <span className="font-mono text-blue-400">{thresholds.lowIntensityThreshold}</span>
                    </div>
                    <input
                        type="range"
                        min="1" max="5"
                        value={thresholds.lowIntensityThreshold}
                        onChange={(e) => handleTune("lowIntensityThreshold", parseInt(e.target.value))}
                        className="w-full accent-blue-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/30 uppercase">System Status</span>
                    <span className="text-[10px] text-emerald-500 font-mono tracking-wider">
                        {universe.system.status}
                    </span>
                </div>
                {universe.signature?.sealed && (
                    <div className="mt-2 text-[10px] text-amber-500/50 italic text-center">
                        Canon Sealed by {universe.signature.steward.slice(0, 8)}...
                    </div>
                )}
            </div>
        </motion.div>
    );
}
