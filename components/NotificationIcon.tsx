// components/NotificationIcon.tsx
"use client";

import { NotificationType } from "@/lib/notifications";

export default function NotificationIcon({ type }: { type: NotificationType }) {
    const base = "h-6 w-6 flex items-center justify-center rounded-full border text-xs";

    switch (type) {
        case "emotional-update":
            return (
                <div className={`${base} border-emerald-400/40 bg-emerald-400/10 text-emerald-300`}>
                    ●
                </div>
            );
        case "dispute-update":
            return (
                <div className={`${base} border-sky-400/40 bg-sky-400/10 text-sky-300`}>
                    ⚡
                </div>
            );
        case "funding-update":
            return (
                <div className={`${base} border-amber-400/40 bg-amber-400/10 text-amber-300`}>
                    ▲
                </div>
            );
        case "credit-item-update":
            return (
                <div className={`${base} border-rose-400/40 bg-rose-400/10 text-rose-300`}>
                    ◆
                </div>
            );
        case "system-guidance":
            return (
                <div className={`${base} border-slate-400/40 bg-slate-400/10 text-slate-300`}>
                    ✦
                </div>
            );
        case "milestone":
            return (
                <div className={`${base} border-emerald-400/60 bg-emerald-400/20 text-emerald-200`}>
                    ★
                </div>
            );
    }
}
