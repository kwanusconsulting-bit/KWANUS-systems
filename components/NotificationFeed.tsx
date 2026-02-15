// components/NotificationFeed.tsx
"use client";

import NotificationItem from "./NotificationItem";
import { Notification } from "@/lib/notifications";

export default function NotificationFeed({ items }: { items: Notification[] }) {
    return (
        <div className="space-y-3">
            {items.length === 0 ? (
                <div className="text-center text-sm text-slate-400 py-8">
                    No notifications yet. The OS will update you as your journey unfolds.
                </div>
            ) : (
                items.map((n) => (
                    <NotificationItem key={n.id} notification={n} />
                ))
            )}
        </div>
    );
}
