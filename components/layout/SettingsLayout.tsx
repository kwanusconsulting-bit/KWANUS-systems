"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
    categories: { id: string; label: string; icon: string }[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
    children: React.ReactNode;
}

export const SettingsLayout = ({ categories, activeCategory, onCategoryChange, children }: SettingsLayoutProps) => {
    return (
        <div className="flex flex-col lg:flex-row gap-12 p-8 min-h-full animate-k-fade">
            {/* LEFT PANEL: CATEGORIES */}
            <aside className="lg:w-64 space-y-2">
                <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-20 mb-6">Settings Domain</h2>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={cn(
                            "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                            activeCategory === cat.id
                                ? "bg-white/5 k-accent"
                                : "text-white/30 hover:text-white hover:bg-white/[.02]"
                        )}
                    >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                        {activeCategory === cat.id && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full k-accent-bg shadow-[0_0_8px_var(--ui-glow)]" />
                        )}
                    </button>
                ))}
            </aside>

            {/* RIGHT PANEL: CONTENT */}
            <main className="flex-1 max-w-3xl space-y-12">
                {children}
            </main>
        </div>
    );
};
