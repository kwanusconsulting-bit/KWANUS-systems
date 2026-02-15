"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";

export default function FeedbackPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-neutral">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">FEEDBACK HUB</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Steward Voice & System Evolution</p>
                </div>
            </header>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* SUBMISSION FORM */}
                <div className="k-glass-panel p-12 space-y-10">
                    {submitted ? (
                        <div className="text-center py-20 space-y-6 animate-fade-in">
                            <div className="text-6xl text-emerald-400">✓</div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Pulse Received</h2>
                            <p className="text-xs opacity-60 uppercase font-bold tracking-widest">Your feedback has been integrated into the evolution cycle.</p>
                            <button onClick={() => setSubmitted(false)} className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 mt-8 underline decoration-indigo-500 underline-offset-8">Send another Pulse</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic">Submit a Pulse</h2>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Pulse Category</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {["Bug Report", "Feature Request", "UI Feedback", "Emotional Pulse"].map(c => (
                                            <button key={c} className="p-4 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:k-accent-border transition-all">{c}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">The Message</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xs h-40 outline-none focus:k-accent-border uppercase font-bold tracking-tight" placeholder="DESCRIBE THE MOTION..."></textarea>
                                </div>

                                <button
                                    onClick={() => setSubmitted(true)}
                                    className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:scale-[1.01] transition-transform"
                                >
                                    SEND TO NEXUS
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* FEEDBACK HISTORY / SYSTEM EVOLUTION */}
                <div className="space-y-8">
                    <section className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Evolution Stream</h2>
                        <div className="space-y-4">
                            {[
                                { action: "Adaptive contrast increased", status: "Evolved", time: "2h ago" },
                                { action: "Navigation rhythm stabilized", status: "Integrated", time: "1d ago" },
                                { action: "Ceremonial glow optimized", status: "Sealed", time: "3d ago" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-widest">{item.action}</div>
                                        <div className="text-[8px] font-bold uppercase opacity-30">{item.time}</div>
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="k-glass-panel p-8 space-y-4 opacity-40">
                        <h3 className="text-xs font-black uppercase tracking-widest">Feedback Integrity</h3>
                        <p className="text-[10px] font-bold uppercase tracking-tight leading-relaxed">
                            Your voice is the primary driver of system mutation. Every pulse submitted is analyzed for harmonic impact and lineage coherence before integration.
                        </p>
                    </section>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Nexus Feedback Loop — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
