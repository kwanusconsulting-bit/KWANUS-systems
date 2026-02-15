"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockEmotionalState } from "@/lib/data/mock";

type EventType = "info" | "success" | "warning" | "critical" | "ceremonial" | "emotional";

interface OSNotification {
    id: string;
    type: EventType;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<OSNotification[]>([
        {
            id: "1",
            type: "ceremonial",
            title: "Rite of Alignment Imminent",
            message: "The system has detected a high-harmonic threshold. Prepare for alignment.",
            time: "2m ago",
            read: false
        },
        {
            id: "2",
            type: "emotional",
            title: "Momentum Nudge",
            message: "Presence detected. Would you like to stabilize the current Progress state?",
            time: "15m ago",
            read: false
        },
        {
            id: "3",
            type: "info",
            title: "Partner Registry Update",
            message: "Nexus Prime has updated their capability framework.",
            time: "1h ago",
            read: true
        },
        {
            id: "4",
            type: "critical",
            title: "Memory Seal Warning",
            message: "Lineage thread 0x44 requires reinforcement to prevent drift.",
            time: "3h ago",
            read: false
        }
    ]);

    const getTypeStyles = (type: EventType) => {
        switch (type) {
            case "critical": return "text-red-400 border-red-500/30 bg-red-500/5";
            case "warning": return "text-orange-400 border-orange-500/30 bg-orange-500/5";
            case "success": return "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
            case "ceremonial": return "text-indigo-400 border-indigo-500/30 bg-indigo-500/5";
            case "emotional": return "text-purple-400 border-purple-500/30 bg-purple-500/5";
            default: return "text-blue-400 border-blue-500/30 bg-blue-500/5";
        }
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">NOTIFICATIONS</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">System Events & Emotional Nudges</p>
                </div>
                <button
                    onClick={markAllRead}
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                    Clear All Events
                </button>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* EVENT FEED */}
                <div className="lg:col-span-2 space-y-4">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={cn(
                                "k-glass-panel p-6 flex gap-6 transition-all group relative overflow-hidden",
                                !n.read ? "border-indigo-500/40 bg-indigo-500/5" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl border flex items-center justify-center text-xl shrink-0",
                                getTypeStyles(n.type)
                            )}>
                                {n.type === "ceremonial" ? "⚓" : n.type === "emotional" ? "≋" : n.type === "critical" ? "⚠" : "○"}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-black uppercase tracking-widest">{n.title}</h3>
                                    <span className="text-[8px] font-bold opacity-30 mt-1">{n.time}</span>
                                </div>
                                <p className="text-xs opacity-60 leading-relaxed max-w-xl">{n.message}</p>
                            </div>

                            {!n.read && <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500 animate-pulse" />}
                        </div>
                    ))}
                </div>

                {/* STATS & QUICK ACTIONS */}
                <div className="space-y-8">
                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Event Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Unread Pulses</span>
                                <span className="text-2xl font-black italic text-indigo-400">{notifications.filter(n => !n.read).length}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Daily Load</span>
                                <span className="text-2xl font-black italic">14</span>
                            </div>
                        </div>
                    </div>

                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Adaptive Setting</h2>
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Current Protocol</div>
                            <div className="text-xs font-bold uppercase">{mockEmotionalState.harmonic} Thresholds</div>
                        </div>
                        <p className="text-[10px] opacity-40 uppercase font-bold tracking-tight leading-relaxed">
                            Notifications are currently being filtered through your emotional harmonic state to prevent system overload.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 border-t border-white/5 pt-12">
                Communication Pillar — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
