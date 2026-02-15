"use client"

export const dynamic = "force-dynamic";

import { useAuth } from "@/components/auth/AuthProvider";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">PROFILE CENTER</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Steward Identity & Access Anchor</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black uppercase opacity-40">Access Level</div>
                    <div className="text-sm font-black italic uppercase text-indigo-400">Prime Steward</div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* IDENTITY CARD */}
                <div className="k-glass-panel p-10 space-y-8 flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full border-8 border-indigo-500/10 bg-indigo-500/5 flex items-center justify-center text-6xl relative">
                        <span className="relative z-10 italic font-black text-indigo-400">Φ</span>
                        <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-spin-slow" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic">{user?.name || "The Steward"}</h2>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">{user?.role || "KWANUS ARCHITECT"}</p>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="p-4 bg-white/5 rounded-xl">
                            <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Active Since</div>
                            <div className="text-xs font-black uppercase mt-1">Feb 2026</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl">
                            <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Resonance</div>
                            <div className="text-xs font-black uppercase mt-1 text-emerald-400">Optimal</div>
                        </div>
                    </div>
                </div>

                {/* SETTINGS MODULES */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="k-glass-panel p-8 space-y-6">
                        <h3 className="text-xl font-black tracking-tighter uppercase italic">Emotional Profile Settings</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Dominant Harmonic", val: "Stable-02" },
                                { label: "Resilience Threshold", val: "High" },
                                { label: "Evolution Pace", val: "Accelerated" }
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{s.label}</span>
                                    <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="k-glass-panel p-8 space-y-6">
                        <h3 className="text-xl font-black tracking-tighter uppercase italic">Connected Surfaces</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {["Steward Mobile", "Control Console V4", "Neural Nexus", "Cloud Arch"].map((device) => (
                                <div key={device} className="p-6 bg-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-black uppercase tracking-widest">{device}</span>
                                    </div>
                                    <span className="text-[8px] font-black opacity-20 group-hover:opacity-40 uppercase">Connected</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Identity Sealed — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
