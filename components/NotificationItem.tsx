// components/NotificationItem.tsx
"use client";

import SlideUp from "@/components/SlideUp";
import Glass from "@/components/Glass";
import NotificationIcon from "./NotificationIcon";
import { Notification } from "@/lib/notifications";

export default function NotificationItem({ notification }: { notification: Notification }) {
    return (
        <SlideUp>
            <Glass className="flex gap-4 items-start p-4">
                <NotificationIcon type={"system"} />

                <div className="flex flex-col gap-1 flex-1">
                    <div className="text-sm font-semibold text-slate-100">
                        System Notification
                    </div>
                    <div className="text-xs text-slate-400">{notification.message}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                    </div>
                </div>
            </Glass>
        </SlideUp>
    );
}
