"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function HelpPage() {
    const [activeCategory, setActiveCategory] = useState("Getting Started");

    const categories = [
        {
            name: "Getting Started", icon: "🚀", topics: [
                { q: "What is KWANUS OS?", a: "KWANUS is a high-harmonic, emotional-adaptive operating system designed for creative stewards." },
                { q: "How do I calibrate my state?", a: "Visit the Profile Center to adjust your emotional baseline and interaction thresholds." }
            ]
        },
        {
            name: "Emotional System", icon: "≋", topics: [
                { q: "What are Harmonics?", a: "Harmonics represent the stability and frequency of your interaction with the system." },
                { q: "How does the UI adapt?", a: "The system scales layout density and color spectrum based on your detected emotional force." }
            ]
        },
        {
            name: "Credit System", icon: "☯", topics: [
                { q: "What is a Hybrid Event?", a: "A hybrid event combines financial credit updates with emotional resonance markers." }
            ]
        },
        {
            name: "Partner Universe", icon: "✧", topics: [
                { q: "What are Partner Nodes?", a: "External systems or entities that harmonize with your OS lineage." }
            ]
        }
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">HELP CENTER</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Knowledge Base & System Documentation</p>
                </div>
                <div className="relative w-72">
                    <input type="text" placeholder="SEARCH PROTOCOLS..." className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:k-accent-border" />
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* CATEGORIES */}
                <div className="lg:w-72 space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-left",
                                activeCategory === cat.name
                                    ? "bg-white/5 border border-white/10 k-accent-border text-white"
                                    : "text-white/40 hover:text-white"
                            )}
                        >
                            <span className="text-xl">{cat.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* TOPICS */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic border-b border-white/5 pb-4">{activeCategory}</h2>
                    <div className="grid gap-6">
                        {categories.find(c => c.name === activeCategory)?.topics.map((topic, i) => (
                            <div key={i} className="k-glass-panel p-8 space-y-4 group">
                                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400">{topic.q}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-tight opacity-60 leading-relaxed max-w-2xl">{topic.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                System Knowledge Sealed — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
