// components/ui/TimelineItem.tsx
"use client";

interface TimelineItemProps {
    time: string;
    event: string;
    detail?: string;
    color?: "emerald" | "sky" | "amber" | "violet" | "slate";
    icon?: string;
}

export default function TimelineItem({
    time,
    event,
    detail,
    color = "slate",
    icon,
}: TimelineItemProps) {
    const colors = {
        emerald: "text-emerald-300 bg-emerald-500/20",
        sky: "text-sky-300 bg-sky-500/20",
        amber: "text-amber-300 bg-amber-500/20",
        violet: "text-violet-300 bg-violet-500/20",
        slate: "text-slate-300 bg-white/20",
    };

    return (
        <div className="flex gap-3">
            <div className="flex-shrink-0">
                {icon ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm">
                        {icon}
                    </div>
                ) : (
                    <div className={`mt-1.5 h-2 w-2 rounded-full ${colors[color]}`} />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400">{time}</p>
                <p className="text-sm font-medium text-white">{event}</p>
                {detail && <p className={`text-sm ${colors[color]}`}>{detail}</p>}
            </div>
        </div>
    );
}
