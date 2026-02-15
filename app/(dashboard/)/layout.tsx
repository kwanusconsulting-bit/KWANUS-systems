import React from 'react';
import { Sidebar } from '@/components/navigation/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-black font-display text-white">
            <Sidebar />
            <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
                <div className="p-4 flex justify-end items-center border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-md z-50">
                    <div className="flex items-center space-x-4">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Steward</div>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
