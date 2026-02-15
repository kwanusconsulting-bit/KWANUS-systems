import React from 'react';
import { cn } from '@/lib/utils';

interface EmotionalBadgeProps {
    state: 'thriving' | 'progress' | 'neutral' | 'worst';
    intensity: number;
    className?: string;
}

export const EmotionalStateBadge = ({ state, intensity, className }: EmotionalBadgeProps) => {
    return (
        <div className={cn(
            'flex items-center gap-3 px-4 py-2 rounded-full border bg-black/40 backdrop-blur-md',
            state === 'thriving' && 'border-emerald-500/30 text-emerald-400',
            state === 'progress' && 'border-orange-500/30 text-orange-400',
            state === 'neutral' && 'border-gray-500/30 text-gray-400',
            state === 'worst' && 'border-purple-500/30 text-purple-400',
            className
        )}>
            <div className={cn(
                'w-2 h-2 rounded-full animate-pulse',
                state === 'thriving' && 'bg-emerald-500',
                state === 'progress' && 'bg-orange-500',
                state === 'neutral' && 'bg-gray-500',
                state === 'worst' && 'bg-purple-500'
            )} />
            <span className="text-[10px] font-black uppercase tracking-widest italic">{state}</span>
            <span className="text-[8px] opacity-40 font-bold">{(intensity * 100).toFixed(0)}%</span>
        </div>
    );
};
