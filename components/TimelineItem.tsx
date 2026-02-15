// components/TimelineItem.tsx
"use client";

import SlideUp from "@/components/SlideUp";

export default function TimelineItem({
    time,
    description,
}: {
    time: string;
    description: string;
}) {
    return (
        <SlideUp>
            <div className="flex gap-3 items-start">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] mt-1 flex-shrink-0" />
                <div className="flex flex-col flex-1">
                    <span className="text-xs text-slate-400">{time}</span>
                    <span className="text-sm text-slate-200">{description}</span>
                </div>
            </div>
        </SlideUp>
    );
}
