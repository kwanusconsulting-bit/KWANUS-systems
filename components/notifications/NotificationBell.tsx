"use client";

import { useEffect, useState } from "react";

export default function NotificationBell() {
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/notifications");
                const data = await res.json();
                setNotifications(data.notifications || []);
                setCount(data.unread || 0);
            } catch (error) {
                console.error("Failed to load notifications");
            }
        }
        load();
        const interval = setInterval(load, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                aria-label="Notifications"
            >
                <span className="text-lg">🔔</span>
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-coral-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                        {count}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-80 rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60">Notifications</h3>
                        {count > 0 && <span className="text-[10px] text-coral-300 font-medium">{count} new</span>}
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                        {notifications.length === 0 ? (
                            <p className="text-slate-500 text-xs py-8 text-center italic">No notifications yet.</p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`rounded-lg border p-3 transition-colors ${n.read ? 'border-white/5 bg-white/5' : 'border-white/10 bg-white/10'}`}
                                >
                                    <p className="text-xs text-white/90 leading-relaxed">{n.message}</p>
                                    <p className="text-[10px] text-white/30 mt-2 font-mono">
                                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                        <a href="/dashboard/notifications" className="block text-center text-[10px] text-white/40 hover:text-white transition uppercase tracking-tighter">View all system logs</a>
                    </div>
                </div>
            )}
        </div>
    );
}
