"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { useDevice } from '@/hooks/useDevice';
import { useAccessibility } from '@/hooks/useAccessibility';

interface PanelLayoutProps {
    header?: React.ReactNode;
    title?: string;
    subtitle?: string;
    primary: React.ReactNode;
    secondary: React.ReactNode;
    tertiary?: React.ReactNode;
}

export const PanelLayout = ({ header, title, subtitle, primary, secondary, tertiary }: PanelLayoutProps) => {
    const { deviceMode, isMobile, isTablet } = useDevice();
    const { shouldSimplifyUI } = useAccessibility();

    // 1. Determine Grid Columns based on device and emotional state
    const getGridCols = () => {
        if (isMobile || shouldSimplifyUI) return 'grid-cols-1';
        if (isTablet) return 'grid-cols-1 lg:grid-cols-3';
        if (tertiary) return 'lg:grid-cols-12';
        return 'lg:grid-cols-3';
    };

    const renderedHeader = header || (
        <div className="space-y-1">
            {title && <h1 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{title}</h1>}
            {subtitle && <h2 className="text-2xl font-black tracking-tighter uppercase italic">{subtitle}</h2>}
        </div>
    );

    return (
        <main className={cn(
            "p-4 md:p-8 space-y-8 min-h-full animate-k-fade",
            `k-device-${deviceMode}`,
            shouldSimplifyUI && "k-layout-minimal"
        )}>
            {/* 1. HEADER */}
            <header className="border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                {renderedHeader}
            </header>

            {/* 2. CORE GRID */}
            <div className={cn("grid gap-6 md:gap-8", getGridCols())}>
                {/* PRIMARY PANEL */}
                <div className={cn(
                    "space-y-8",
                    !isMobile && !shouldSimplifyUI && (tertiary ? "lg:col-span-6" : "lg:col-span-2")
                )}>
                    {primary}
                </div>

                {/* SECONDARY PANEL */}
                <div className={cn(
                    "space-y-8",
                    !isMobile && !shouldSimplifyUI && (tertiary ? "lg:col-span-3" : "lg:col-span-1")
                )}>
                    {secondary}
                </div>

                {/* TERTIARY PANEL (Optional Intelligence Layer) */}
                {tertiary && !isMobile && !shouldSimplifyUI && (
                    <div className="lg:col-span-3 space-y-8">
                        {tertiary}
                    </div>
                )}
            </div>
        </main>
    );
};
