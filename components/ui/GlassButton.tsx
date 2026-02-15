"use client";

export function GlassButton({ children, onClick, className = "" }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition ${className}`}
        >
            {children}
        </button>
    );
}
