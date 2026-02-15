"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PreferencesPage() {
    const [adaptiveIntensity, setAdaptiveIntensity] = useState(75);

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">PREFERENCES</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Visual & Interaction Calibration</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* VISUAL CONTROLS */}
                <div className="space-y-8">
                    <section className="k-glass-panel p-8 space-y-8">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Visual Preferences</h2>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest">Theme Mode</div>
                                    <div className="text-[10px] opacity-40 uppercase font-bold">Override adaptive state</div>
                                </div>
                                <select className="bg-white/5 border border-white/10 rounded px-4 py-2 text-[10px] font-black uppercase">
                                    <option>Adaptive (Auto)</option>
                                    <option>Dark Immersion</option>
                                    <option>Pure Luster</option>
                                </select>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest">Motion Density</div>
                                    <div className="text-[10px] opacity-40 uppercase font-bold">Subtle to Ceremonial</div>
                                </div>
                                <div className="flex gap-2">
                                    {["Low", "Normal", "High"].map(m => (
                                        <button key={m} className={cn("px-4 py-1 text-[8px] font-black uppercase border rounded transition-all", m === "Normal" ? "bg-indigo-500/20 border-indigo-500/50" : "bg-white/5 border-white/10")}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Accessibility</h2>
                        <div className="space-y-4">
                            {[
                                "Screen Reader Optimization",
                                "High Contrast Outlines",
                                "Aria-Compliant Transitions",
                                "Forced Stillness (Reduced Motion)"
                            ].map(a => (
                                <div key={a} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                                    <span className="text-xs font-black uppercase tracking-widest">{a}</span>
                                    <div className="w-10 h-5 bg-white/10 rounded-full relative">
                                        <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* EMOTIONAL ADAPTIVE CONTROLS */}
                <div className="space-y-8">
                    <section className="k-glass-panel p-10 space-y-10 border-indigo-500/20 bg-indigo-500/5">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic text-indigo-400">Adaptive Intelligence</h2>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                                    <span>Intensity Scale</span>
                                    <span>{adaptiveIntensity}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={adaptiveIntensity}
                                    onChange={(e) => setAdaptiveIntensity(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="text-xs font-black uppercase tracking-widest">Behavior: Harmonic Shift</div>
                                <p className="text-[10px] opacity-60 uppercase font-medium leading-relaxed">
                                    When enabled, the OS will subtly adjust its layout density and color spectrum based on your detected emotional harmonic state.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Platform Sync</h2>
                        <div className="p-6 bg-white/5 rounded-2xl flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-2xl">☁</div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest">Cloud Preferences</div>
                                <div className="text-[10px] opacity-40 uppercase font-bold">Synchronized across 4 devices</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Steward Preferences Sealed — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
