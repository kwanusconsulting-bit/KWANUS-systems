// components/ui/GlassCard.tsx
"use client";

interface GlassCardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    badge?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

export default function GlassCard({
    children,
    title,
    subtitle,
    badge,
    className = "",
    onClick,
    href,
}: GlassCardProps) {
    const baseClasses = `rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl transition-all ${onClick || href ? "cursor-pointer hover:bg-slate-900/60 hover:border-white/20" : ""
        } ${className}`;

    const content = (
        <>
            {(title || subtitle || badge) && (
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        {title && (
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                                {title}
                            </h3>
                        )}
                        {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
                    </div>
                    {badge && <div>{badge}</div>}
                </div>
            )}
            {children}
        </>
    );

    if (href) {
        return (
            <a href={href} className={baseClasses}>
                {content}
            </a>
        );
    }

    if (onClick) {
        return (
            <button onClick={onClick} className={baseClasses}>
                {content}
            </button>
        );
    }

    return <div className={baseClasses}>{content}</div>;
}
