// components/ui/StatCard.tsx
"use client";

interface StatCardProps {
    label: string;
    value: string | number;
    description?: string;
    color?: "emerald" | "sky" | "amber" | "violet" | "slate";
    icon?: string;
}

export default function StatCard({
    label,
    value,
    description,
    color = "slate",
    icon,
}: StatCardProps) {
    const colors = {
        emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-300",
        sky: "from-sky-500/10 to-sky-500/5 border-sky-500/20 text-sky-300",
        amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-300",
        violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20 text-violet-300",
        slate: "from-slate-900/40 to-slate-900/40 border-white/10 text-white",
    };

    return (
        <div
            className={`rounded-2xl border bg-gradient-to-br p-5 backdrop-blur-xl transition-all hover:scale-[1.02] ${colors[color]}`}
        >
            {icon && <div className="mb-3 text-2xl">{icon}</div>}
            <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
        </div>
    );
}
