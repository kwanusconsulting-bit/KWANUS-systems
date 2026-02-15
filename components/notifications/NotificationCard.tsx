"use client";

import { GlassPanel } from "@/components/ui";

export default function NotificationCard({ notification }: any) {
    const isRead = notification.read;

    return (
        <GlassPanel className={`p-6 border-l-4 transition-all duration-300 ${isRead ? 'border-l-white/10 opacity-60' : 'border-l-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]'}`}>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        {!isRead && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        <h4 className="text-sm font-bold text-white tracking-tight uppercase">
                            {notification.type || "System Alert"}
                        </h4>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic font-serif py-1">
                        {notification.message}
                    </p>
                    <div className="text-[10px] text-white/30 mt-3 uppercase tracking-widest font-mono">
                        {new Date(notification.createdAt).toLocaleString()} • Kernel ID: {notification.id.slice(0, 8)}
                    </div>
                </div>
                {!isRead && (
                    <button className="text-[10px] font-bold text-emerald-400/60 hover:text-emerald-400 uppercase tracking-widest transition-colors">
                        Acknowledge
                    </button>
                )}
            </div>
        </GlassPanel>
    );
}
