"use client"

export const dynamic = "force-dynamic";

import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

export default function SecurityPage() {
    const { logout } = useAuth();

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">SECURITY CENTER</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Session Integrity & Access Control</p>
                </div>
                <button
                    onClick={logout}
                    className="px-6 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 transition-all"
                >
                    Emergency Logout
                </button>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* ACTIVE SESSIONS */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="k-glass-panel p-10 space-y-10">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Active Steward Sessions</h2>
                        <div className="space-y-6">
                            {[
                                { device: "MacBook Pro M2 — Chrome", location: "New York, USA", current: true },
                                { device: "iPhone 15 — Mobile App", location: "New York, USA", current: false },
                                { device: "Control Console V4", location: "Cosmic Hub 0x99", current: false }
                            ].map((s, i) => (
                                <div key={i} className={cn(
                                    "flex justify-between items-center p-6 border rounded-2xl transition-all",
                                    s.current ? "bg-indigo-500/5 border-indigo-500/30" : "bg-white/5 border-white/5 opacity-60"
                                )}>
                                    <div className="space-y-1">
                                        <div className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                                            {s.device}
                                            {s.current && <span className="text-[8px] bg-indigo-500 text-white px-2 py-0.5 rounded-full">CURRENT</span>}
                                        </div>
                                        <div className="text-[10px] opacity-40 uppercase font-bold">{s.location} — Active now</div>
                                    </div>
                                    {!s.current && (
                                        <button className="text-[8px] font-black uppercase opacity-40 hover:text-red-400 hover:opacity-100 transition-all">Revoke</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Login History</h2>
                        <div className="space-y-3">
                            {[
                                "Successful login — 2026-02-13 14:32",
                                "Successful login — 2026-02-12 09:15",
                                "Security challenge passed — 2026-02-12 09:14",
                                "Successful login — 2026-02-11 21:04"
                            ].map((log, i) => (
                                <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40 px-4">
                                    <span className="w-1 h-1 rounded-full bg-indigo-500" />
                                    <span>{log}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* SECURITY PROTOCOLS */}
                <div className="space-y-8">
                    <section className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Enhanced Protection</h2>
                        <div className="space-y-4">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-4">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest">Multi-Factor Resonance</div>
                                    <div className="text-[10px] opacity-40 uppercase font-bold mt-1">Pending Activation</div>
                                </div>
                                <button className="w-full py-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/20 transition-all rounded-lg">
                                    ENABLE MFR
                                </button>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Session Timeout</div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs font-black uppercase">4 Cycles (Hours)</span>
                                    <button className="text-[8px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity">Adjust</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Security Infrastructure Sealed — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
