"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DataCenterPage() {
    const [exporting, setExporting] = useState(false);

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">DATA MANAGEMENT</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Transparency & Lineage Export</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black uppercase opacity-40">Stored Volume</div>
                    <div className="text-sm font-black italic uppercase text-indigo-400">12.4 MB</div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* DATA OVERVIEW */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="k-glass-panel p-10 space-y-10">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Identity Lineage Archive</h2>
                        <div className="space-y-6">
                            {[
                                { label: "Emotional States Log", items: 124, size: "1.2 MB" },
                                { label: "Partner Interactions", items: 42, size: "0.8 MB" },
                                { label: "Preference Snapshot History", items: 8, size: "0.1 MB" },
                                { label: "System Transition Records", items: 256, size: "10.3 MB" }
                            ].map((d, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                    <div className="space-y-1">
                                        <div className="text-sm font-black uppercase tracking-widest">{d.label}</div>
                                        <div className="text-[10px] opacity-40 uppercase font-bold">{d.items} entries cached</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-black italic group-hover:text-indigo-400 transition-colors">{d.size}</div>
                                        <div className="text-[8px] font-black uppercase opacity-20 mt-1">Ready</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="k-glass-panel p-8 space-y-6 border-indigo-500/20 bg-indigo-500/5">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic text-indigo-400">Export Controls</h2>
                        <p className="text-xs opacity-60 leading-relaxed uppercase font-bold tracking-tight">
                            Generate a cryptographic archive of your entire Steward history. This includes every emotional shift, every ritual performed, and every partner interaction recorded within the KWANUS environment.
                        </p>
                        <button
                            onClick={() => setExporting(true)}
                            className={cn(
                                "w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all",
                                exporting ? "bg-indigo-500/20 text-indigo-400 cursor-wait" : "bg-white text-black hover:scale-[1.02]"
                            )}
                        >
                            {exporting ? "SYNTACTIC SEALING IN PROGRESS..." : "INITIATE FULL LINEAGE EXPORT"}
                        </button>
                    </section>
                </div>

                {/* RETENTION & DELETION */}
                <div className="space-y-8">
                    <section className="k-glass-panel p-8 space-y-6 border-red-500/20">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic text-red-400">Retention Policies</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Session Cache</div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs font-black uppercase">Eternal</span>
                                    <button className="text-[8px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity">Change</button>
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Partner Metadata</div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs font-black uppercase">365 Cycles</span>
                                    <button className="text-[8px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity">Change</button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5 space-y-4">
                            <p className="text-[8px] opacity-40 uppercase font-bold leading-relaxed">
                                Caution: Deleting lineage data is irreversible and will permanently fracture your history within the OS.
                            </p>
                            <button className="w-full py-3 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all rounded-lg">
                                PURGE LOCAL CACHE
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Lineage Data Protected — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
