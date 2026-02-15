import React from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ className, label, ...props }: InputProps) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold ml-1">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all text-sm placeholder:text-zinc-700",
                    className
                )}
                {...props}
            />
        </div>
    );
};
