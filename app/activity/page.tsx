"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ActivityEvent {
    id: string;
    category: "User" | "System" | "Steward";
    desc: string;
    timestamp: string;
    severity: "info" | "success" | "warning" | "critical";
    surface: string;
}

export default function ActivityLogPage() {
    const [filter, setFilter] = useState<string>("All");

    const events: ActivityEvent[] = [
        { id: "e1", category: "Steward", desc: "Ritual Engine expansion online", timestamp: "2026-02-13 14:52", severity: "success", surface: "/rituals" },
        { id: "e2", category: "System", desc: "Emotional harmonic shifted: Stable → Progress", timestamp: "2026-02-13 14:45", severity: "info", surface: "/emotional" },
        { id: "e3", category: "User", desc: "Settings updated: adaptive animations enabled", timestamp: "2026-02-13 14:30", severity: "info", surface: "/settings" },
        { id: "e4", category: "System", desc: "Partner registry sync completed: 4 nodes aligned", timestamp: "2026-02-13 14:15", severity: "success", surface: "/partners" },
        { id: "e5", category: "Steward", desc: "Continuity health verified: 99.4%", timestamp: "2026-02-13 13:58", severity: "info", surface: "/continuity" },
        { id: "e6", category: "System", desc: "Warning: Lineage thread 0x44 drift detected", timestamp: "2026-02-13 13:42", severity: "warning", surface: "/lineage" },
    ];

    const filteredEvents = filter === "All" ? events : events.filter(e => e.category === filter);

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">ACTIVITY LOG</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Audit Trail of Motion</p>
                </div>
                <div className="flex gap-2">
                    {["All", "User", "System", "Steward"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
                                filter === f ? "bg-indigo-500/20 border-indigo-500/50" : "bg-white/5 border-white/5 opacity-40 hover:opacity-100"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="k-glass-panel relative overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Timestamp</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Category</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Description</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Surface</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Severity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredEvents.map((e) => (
                            <tr key={e.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
                                    {e.timestamp}
                                </td>
                                <td className="p-6">
                                    <span className={cn(
                                        "px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest",
                                        e.category === "Steward" ? "bg-indigo-500/10 text-indigo-400" : e.category === "System" ? "bg-purple-500/10 text-purple-400" : "bg-white/10 text-white"
                                    )}>
                                        {e.category}
                                    </span>
                                </td>
                                <td className="p-6 text-xs font-bold uppercase tracking-widest opacity-90">
                                    {e.desc}
                                </td>
                                <td className="p-6 text-[10px] font-bold uppercase tracking-widest text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {e.surface}
                                </td>
                                <td className="p-6">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        e.severity === "success" ? "bg-emerald-500" : e.severity === "warning" ? "bg-orange-500" : e.severity === "critical" ? "bg-red-500" : "bg-indigo-500"
                                    )} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 pt-12 border-t border-white/5">
                Audit Pillar — KWANUS OS — THE FINAL SEAL — MMXXVI
            </footer>
        </main>
    );
}
