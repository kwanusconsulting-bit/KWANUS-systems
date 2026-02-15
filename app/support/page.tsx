"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SupportPage() {
    const [activeThread, setActiveThread] = useState<number | null>(0);

    const threads = [
        {
            id: 0,
            subject: "Inquiry: Harmonic Calibration",
            status: "Open",
            time: "2h ago",
            messages: [
                { sender: "Steward", text: "I'm experiencing drift in my neutral threshold settings." },
                { sender: "Nexus Support", text: "We have detected the drift. Please run the Ritual of Alignment (0x99) to stabilize." }
            ]
        },
        { id: 1, subject: "Partner Synchronization Error", status: "Resolved", time: "2d ago", messages: [] },
        { id: 2, subject: "Lineage Export Verification", status: "In-Progress", time: "4d ago", messages: [] }
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">SUPPORT INBOX</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Steward Connection & Nexus Direct</p>
                </div>
                <button className="px-6 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-500/20 transition-all">
                    New Inquiry
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-12 h-[600px]">
                {/* THREAD LIST */}
                <div className="lg:w-80 space-y-4 overflow-y-auto pr-2">
                    {threads.map((t, i) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveThread(i)}
                            className={cn(
                                "w-full p-6 k-glass-panel text-left transition-all group relative",
                                activeThread === i ? "k-accent-border bg-white/5" : "opacity-60 hover:opacity-100"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={cn(
                                    "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                                    t.status === "Open" ? "text-emerald-400 bg-emerald-400/10" : "text-white bg-white/10"
                                )}>{t.status}</span>
                                <span className="text-[8px] font-bold opacity-30 uppercase">{t.time}</span>
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest leading-tight">{t.subject}</h3>
                            {activeThread === i && <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500" />}
                        </button>
                    ))}
                </div>

                {/* MESSAGE VIEW */}
                <div className="flex-1 k-glass-panel flex flex-col overflow-hidden relative">
                    {activeThread !== null ? (
                        <>
                            <header className="p-8 border-b border-white/5">
                                <h2 className="text-xl font-black tracking-tighter uppercase italic">{threads[activeThread].subject}</h2>
                                <p className="text-[10px] font-bold uppercase opacity-40 mt-1">Direct nexus connection established</p>
                            </header>

                            <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-black/20">
                                {threads[activeThread].messages.map((m, i) => (
                                    <div key={i} className={cn(
                                        "max-w-xl space-y-2",
                                        m.sender === "Steward" ? "ml-auto text-right" : "mr-auto text-left"
                                    )}>
                                        <div className="text-[8px] font-black uppercase tracking-widest opacity-30">{m.sender}</div>
                                        <div className={cn(
                                            "p-6 rounded-2xl text-xs font-bold uppercase tracking-tight leading-relaxed",
                                            m.sender === "Steward" ? "bg-indigo-500/10 border border-indigo-500/30" : "bg-white/5 border border-white/10"
                                        )}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <footer className="p-8 border-t border-white/5 bg-black/40">
                                <div className="flex gap-4">
                                    <input type="text" placeholder="REPLY TO NEXUS..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-tight outline-none focus:k-accent-border" />
                                    <button className="px-8 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                        SEND
                                    </button>
                                </div>
                            </footer>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center opacity-20 text-[10px] font-black uppercase tracking-[0.5em]">
                            Select a thread to view motion
                        </div>
                    )}
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Direct Support Pillar — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
