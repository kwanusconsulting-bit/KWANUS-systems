import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'mythic';
}

export const Card = ({ children, className, variant = 'default' }: CardProps) => {
    return (
        <div className={cn(
            "rounded-2xl border p-4 transition-all",
            {
                'bg-white/5 border-white/10': variant === 'default',
                'bg-gradient-to-br from-zinc-900 to-black border-white/5 shadow-2xl shadow-indigo-500/10': variant === 'mythic',
            },
            className
        )}>
            {children}
        </div>
    );
};
