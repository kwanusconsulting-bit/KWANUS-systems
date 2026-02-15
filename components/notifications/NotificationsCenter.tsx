"use client";

import NotificationCard from "./NotificationCard";
import { GlassCard } from "@/components/ui";

export default function NotificationsCenter({ notifications }: any) {
    return (
        <div className="space-y-10 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Alert Chamber</h1>
                <p className="text-sm text-white/40 uppercase tracking-[0.2em]">Ceremonial signals from the OS kernel</p>
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <GlassCard className="py-20 text-center text-white/40 italic">
                        The chamber is still. No active signals detected.
                    </GlassCard>
                ) : (
                    notifications.map((n: any) => (
                        <NotificationCard key={n.id} notification={n} />
                    ))
                )}
            </div>
        </div>
    );
}
