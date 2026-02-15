// components/ui/GlassInput.tsx
"use client";

interface GlassInputProps {
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export default function GlassInput({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    className = "",
}: GlassInputProps) {
    return (
        <div className={className}>
            {label && (
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 backdrop-blur-xl transition-all focus:border-emerald-500/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
        </div>
    );
}
