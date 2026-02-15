// components/ui/GlassPanel.tsx
"use client";

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
    glow?: "emerald" | "sky" | "amber" | "violet" | "none";
}

export default function GlassPanel({ children, className = "", glow = "none" }: GlassPanelProps) {
    const glowColors = {
        emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
        sky: "from-sky-500/10 to-sky-500/5 border-sky-500/20",
        amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
        violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20",
        none: "from-slate-900/40 to-slate-900/40 border-white/10",
    };

    return (
        <div
            className={`rounded-2xl border bg-gradient-to-br backdrop-blur-xl ${glowColors[glow]} ${className}`}
        >
            {children}
        </div>
    );
}
