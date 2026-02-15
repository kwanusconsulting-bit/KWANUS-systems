"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";

export default function FocusPage() {
    const [active, setActive] = useState(false);

    return (
        <main className={`min-h-screen flex items-center justify-center p-8 transition-all duration-1000 ${active ? 'bg-black' : 'bg-black/50'}`}>
            <div className="max-w-xl w-full text-center space-y-12">
                {!active ? (
                    <div className="space-y-8 animate-fade-in">
                        <h1 className="text-7xl font-black tracking-[0.2em] uppercase italic k-accent">FOCUS</h1>
                        <p className="text-xs font-bold tracking-[0.5em] uppercase opacity-40">Silence the nexus. Enter the void.</p>
                        <button
                            onClick={() => setActive(true)}
                            className="px-12 py-5 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all"
                        >
                            Initiate Void
                        </button>
                    </div>
                ) : (
                    <div className="space-y-16 animate-pulse duration-[4000ms]">
                        <div className="text-9xl font-black tracking-tighter italic opacity-10">25:00</div>
                        <button
                            onClick={() => setActive(false)}
                            className="text-[8px] font-black uppercase tracking-[0.5em] opacity-20 hover:opacity-100 transition-opacity"
                        >
                            Return to Nexus
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
