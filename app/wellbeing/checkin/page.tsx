"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";

export default function CheckInPage() {
    const [state, setState] = useState(50);

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">EMOTIONAL CHECK-IN</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Harmonic Alignment & State Registration</p>
            </header>

            <div className="max-w-xl mx-auto k-glass-panel p-16 space-y-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic text-center">How is your motion?</h2>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={state}
                        onChange={(e) => setState(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-2 bg-white/5 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                        <span>Unstable</span>
                        <span>Harmonic</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {["Grounded", "Creative", "Fatigued", "Expansive"].map(tag => (
                        <button key={tag} className="p-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:k-accent-border transition-all">
                            {tag}
                        </button>
                    ))}
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:scale-[1.01] transition-transform">
                    SEAL STATE
                </button>
            </div>
        </main>
    );
}
