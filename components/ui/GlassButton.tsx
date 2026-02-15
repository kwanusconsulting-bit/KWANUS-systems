// components/ui/GlassButton.tsx
"use client";

interface GlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
}

export default function GlassButton({
    children,
    onClick,
    href,
    variant = "secondary",
    className = "",
}: GlassButtonProps) {
    const variants = {
        primary: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]",
        secondary: "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20",
        ghost: "bg-transparent border-transparent text-slate-300 hover:bg-white/5",
    };

    const baseClasses = `inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition-all backdrop-blur-xl ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={baseClasses}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {children}
        </button>
    );
}
