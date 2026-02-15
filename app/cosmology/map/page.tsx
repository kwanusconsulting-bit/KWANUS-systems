"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { mockPartners } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

type Layer = "Emotional" | "Partner" | "Lineage" | "Ceremonial" | "Temporal";

export default function CosmologicalMap() {
    const [activeLayers, setActiveLayers] = useState<Layer[]>(["Emotional", "Partner"]);

    const toggleLayer = (layer: Layer) => {
        setActiveLayers(prev =>
            prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
        );
    };

    const layers: { id: Layer; icon: string; desc: string }[] = [
        { id: "Emotional", icon: "◎", desc: "Physics & Harmonics" },
        { id: "Partner", icon: "◈", desc: "Consonants & Themes" },
        { id: "Lineage", icon: "≡", desc: "Story Arcs & Memory" },
        { id: "Ceremonial", icon: "⚓", desc: "Rites & Gates" },
        { id: "Temporal", icon: "⧖", desc: "Time & Cycles" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-8 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">COSMOLOGICAL MAP</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Sky of the KWANUS Universe</p>
                </div>
                <div className="flex gap-2">
                    {layers.map((layer) => (
                        <button
                            key={layer.id}
                            onClick={() => toggleLayer(layer.id)}
                            className={cn(
                                "px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
                                activeLayers.includes(layer.id)
                                    ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                    : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                            )}
                        >
                            {layer.icon} {layer.id}
                        </button>
                    ))}
                </div>
            </header>

            {/* THE GRAND VISUALIZATION (THE SKY) */}
            <div className="k-glass-panel relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
                {/* BACKGROUND GRID / GEOMETRY */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />

                {/* CENTER SINGULARITY (THE STEWARD) */}
                <div className="relative w-[500px] h-[500px]">
                    {/* CEREMONIAL RINGS (CONSTANT) */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
                    <div className="absolute inset-20 rounded-full border border-indigo-500/10 animate-reverse-spin" />

                    {/* EMOTIONAL LAYER (WAVES) */}
                    {activeLayers.includes("Emotional") && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[400px] h-[400px] rounded-full border-2 border-indigo-500/20 blur-xl animate-pulse" />
                            <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/5 mix-blend-screen" />
                        </div>
                    )}

                    {/* PARTNER LAYER (CONSTELLATIONS) */}
                    {activeLayers.includes("Partner") && (
                        <div className="absolute inset-0">
                            {mockPartners.map((p, i) => {
                                const angle = (i / mockPartners.length) * Math.PI * 2;
                                const radius = 200;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                return (
                                    <div
                                        key={p.id}
                                        className="absolute w-4 h-4 rounded-full bg-indigo-400/80 shadow-[0_0_15px_rgba(129,140,248,0.8)] group cursor-pointer"
                                        style={{
                                            left: `calc(50% + ${x}px)`,
                                            top: `calc(50% + ${y}px)`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            {p.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* LINEAGE LAYER (THREADS) */}
                    {activeLayers.includes("Lineage") && (
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                            <path
                                d="M 250 250 Q 300 100 450 250 T 250 450 Q 50 250 250 50"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="1"
                                className="animate-dash"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="indigo" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                    )}

                    {/* CENTER POINT */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_white]">
                        <span className="text-black text-[10px] font-black italic">Φ</span>
                    </div>
                </div>
            </div>

            {/* LAYER LEGEND / INFO */}
            <footer className="grid md:grid-cols-5 gap-4">
                {layers.map((l) => (
                    <div
                        key={l.id}
                        className={cn(
                            "k-glass-panel p-4 space-y-1 transition-all",
                            activeLayers.includes(l.id) ? "opacity-100 k-accent-border" : "opacity-30"
                        )}
                    >
                        <div className="text-xs font-black uppercase tracking-widest">{l.id}</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest opacity-40">{l.desc}</div>
                    </div>
                ))}
            </footer>
        </main>
    );
}
