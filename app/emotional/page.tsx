"use client"

export const dynamic = "force-dynamic";

import { mockEmotionalState } from "@/lib/data/mock"

export default function EmotionalEngine() {
    const forces = [
        { name: "Gravity", desc: "Belonging & Stability", icon: "●", val: 85 },
        { name: "Momentum", desc: "Desire & Activation", icon: "→", val: 62 },
        { name: "Friction", desc: "Resistance & Protection", icon: "≈", val: 12 },
        { name: "Illumination", desc: "Insight & Guidance", icon: "☼", val: 44 },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="space-y-2">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">EMOTIONAL ENGINE</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Force Engine of the Cosmos</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* FORCE MAP (GEOMETRY) */}
                <div className="lg:col-span-2 k-glass-panel p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--k-accent)_0%,_transparent_70%)]" />

                    <div className="relative w-80 h-80">
                        {/* ORBITAL RINGS */}
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
                        <div className="absolute inset-8 rounded-full border border-indigo-500/10 animate-reverse-spin" />

                        {/* FORCE VECTORS */}
                        {forces.map((force, i) => (
                            <div
                                key={i}
                                className="absolute flex flex-col items-center gap-2"
                                style={{
                                    top: i === 0 ? '0' : i === 2 ? 'auto' : '50%',
                                    bottom: i === 2 ? '0' : 'auto',
                                    left: i === 3 ? '0' : i === 1 ? 'auto' : '50%',
                                    right: i === 1 ? '0' : 'auto',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:k-accent-border transition-all cursor-crosshair">
                                    {force.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{force.name}</span>
                            </div>
                        ))}

                        {/* CORE SINGULARITY */}
                        <div className="absolute inset-[35%] rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />
                        <div className="absolute inset-[45%] rounded-full border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_30px_rgba(129,140,248,0.5)]">
                            <span className="text-2xl font-black italic">Φ</span>
                        </div>
                    </div>
                </div>

                {/* STATE SUMMARY (MOMENTUM) */}
                <div className="space-y-8">
                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Current Resonance</h2>
                        <div className="space-y-4">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Dominant Tone</div>
                                <div className="text-3xl font-black uppercase italic text-indigo-400">{mockEmotionalState.tone}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Harmonic</div>
                                    <div className="text-xs font-black uppercase">{mockEmotionalState.harmonic}</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Force</div>
                                    <div className="text-xs font-black uppercase">{mockEmotionalState.force}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Atmospheric Toggles</h2>
                        <div className="space-y-4">
                            {["WORST", "NEUTRAL", "PROGRESS", "THRIVING"].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => document.body.className = `k-mode-${m.toLowerCase()}`}
                                    className="w-full py-3 text-[10px] font-black uppercase tracking-[0.3em] border border-white/5 rounded-lg hover:bg-white/5 transition-all"
                                >
                                    SIMULATE {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* TIMELINE (CHOREOGRAPHY) */}
            <section className="k-glass-panel p-8 space-y-8">
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Transition Timeline</h2>
                <div className="relative h-24 flex items-center">
                    <div className="absolute w-full h-px bg-white/10" />
                    <div className="w-full flex justify-between relative px-12">
                        {[1, 2, 3, 4, 5].map((t) => (
                            <div key={t} className="flex flex-col items-center gap-4 group">
                                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-indigo-500 transition-colors relative z-10" />
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Threshold {t}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
