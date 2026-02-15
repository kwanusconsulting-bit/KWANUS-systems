"use client"

export const dynamic = "force-dynamic";

export default function EnergyPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">ENERGY TRACKER</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Fatigue Signal Analysis & Focus Optimization</p>
            </header>
            <div className="k-glass-panel p-12 min-h-[400px] flex flex-col justify-center items-center text-center space-y-12">
                <div className="w-32 h-32 rounded-full border-8 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <div className="text-[10px] font-black uppercase tracking-[1em] opacity-40">Analyzing Neural Fatigue Patterns...</div>
            </div>
        </main>
    );
}
