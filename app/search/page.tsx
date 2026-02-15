"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">GLOBAL SEARCH</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Cross-Platform Discovery & Data Retrieval</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="SEARCH EMOTIONAL DATA, PARTNERS, OR LOGS..."
                        className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-6 text-xl font-black uppercase tracking-widest outline-none focus:k-accent-border transition-all"
                    />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Identity", "Harmonics", "Partners", "Logs", "Media", "Rituals", "Events", "Settings"].map(f => (
                        <button key={f} className="p-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all opacity-60">
                            {f}
                        </button>
                    ))}
                </div>

                {query ? (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] opacity-40">Search Results</h2>
                        <div className="p-20 k-glass-panel text-center opacity-20 text-[10px] font-black uppercase tracking-widest">
                            No local matches for &quot;{query}&quot;<br />Checking Nexus Archive...
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] opacity-40">Recent Queries</h2>
                        <div className="flex flex-wrap gap-4">
                            {["Steward-Alpha", "Threshold 0x99", "Partner Sync", "UI Drift"].map(q => (
                                <span key={q} className="text-[10px] font-bold uppercase opacity-30 hover:opacity-100 cursor-pointer underline decoration-indigo-500/30">{q}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
