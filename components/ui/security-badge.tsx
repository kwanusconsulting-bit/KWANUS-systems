"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface SecurityBadgeProps {
    status: 'trusted' | 'encrypted' | 'private' | 'alert';
    label?: string;
    className?: string;
}

export const SecurityBadge = ({ status, label, className }: SecurityBadgeProps) => {
    const icons = {
        trusted: '🛡',
        encrypted: '🔑',
        private: '👁‍🗨',
        alert: '⚠️'
    };

    const colors = {
        trusted: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        encrypted: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
        private: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
        alert: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    };

    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest animate-k-fade",
            colors[status],
            className
        )}>
            <span>{icons[status]}</span>
            <span>{label || status}</span>
        </div>
    );
};
