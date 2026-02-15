"use client";

export function GlassCard({ children, className = "" }: any) {
    return (
        <div
            className={`p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 ${className}`}
        >
            {children}
        </div>
    );
}
