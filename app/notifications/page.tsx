// app/notifications/page.tsx
"use client";

export const dynamic = "force-dynamic";

import NotificationFeed from "@/components/NotificationFeed";
import SlideUp from "@/components/SlideUp";
import { Notification } from "@/lib/notifications";

const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "emotional-update",
        title: "Emotional State Updated",
        message: "You shifted to Steady & Clear. The OS has adjusted pacing.",
        timestamp: "2h ago",
    },
    {
        id: "2",
        type: "dispute-update",
        title: "Dispute Sent",
        message: "Your Experian dispute letter was mailed and logged.",
        timestamp: "Yesterday",
    },
    {
        id: "3",
        type: "funding-update",
        title: "Funding Application Submitted",
        message: "Community Lender received your application.",
        timestamp: "2 days ago",
    },
    {
        id: "4",
        type: "system-guidance",
        title: "Next Right Action",
        message: "Review your dispute letter draft for Account #4321.",
        timestamp: "3 days ago",
    },
    {
        id: "5",
        type: "credit-item-update",
        title: "Credit Item Updated",
        message: "Balance decreased on Capital One account.",
        timestamp: "4 days ago",
    },
    {
        id: "6",
        type: "milestone",
        title: "Milestone Reached",
        message: "You&apos;ve completed your first dispute cycle. The OS is proud of you.",
        timestamp: "1 week ago",
    },
];

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto max-w-3xl space-y-6">
                <SlideUp delay={50}>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
                        <p className="text-sm text-slate-400">
                            The OS&apos;s living memory of your journey.
                        </p>
                    </div>
                </SlideUp>

                <SlideUp delay={150}>
                    <NotificationFeed items={mockNotifications} />
                </SlideUp>
            </div>
        </div>
    );
}
