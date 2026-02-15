import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PanelProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'deep';
}

export const Panel = ({ children, className, variant = 'glass' }: PanelProps) => {
    return (
        <div className={cn(
            "rounded-3xl border transition-all duration-500",
            {
                'bg-black/40 backdrop-blur-xl border-white/5 shadow-2xl': variant === 'glass',
                'bg-black border-white/10': variant === 'default',
                'bg-white/[0.02] border-white/[0.04]': variant === 'deep',
            },
            "p-6",
            className
        )}>
            {children}
        </div>
    );
};
