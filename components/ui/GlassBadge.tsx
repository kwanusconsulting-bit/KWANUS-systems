"use client";

export function GlassBadge({ children, className = "" }: any) {
    return (
        <span className={`px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest ${className}`}>
            {children}
        </span>
    );
}
