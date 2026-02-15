"use client"

import React from 'react';

export default function WellbeingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black/90 text-white">
            <nav className="border-b border-white/5 p-4 flex gap-6 overflow-x-auto text-[10px] font-black uppercase tracking-widest">
                <a href="/wellbeing/checkin" className="opacity-40 hover:opacity-100 transition-opacity">Check-in</a>
                <a href="/wellbeing/grounding" className="opacity-40 hover:opacity-100 transition-opacity">Grounding</a>
                <a href="/wellbeing/energy" className="opacity-40 hover:opacity-100 transition-opacity">Energy</a>
                <a href="/wellbeing/reflection" className="opacity-40 hover:opacity-100 transition-opacity">Reflection</a>
                <a href="/wellbeing/pacing" className="opacity-40 hover:opacity-100 transition-opacity">Pacing</a>
            </nav>
            <div className="animate-fade-in">
                {children}
            </div>
        </div>
    );
}
