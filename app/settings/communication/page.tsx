"use client"

export const dynamic = "force-dynamic";

export default function CommunicationSettings() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">COMM SETTINGS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Interaction Protocols & Global Preferences</p>
            </header>
            <div className="max-w-xl space-y-8">
                {["Real-time Sync", "Adaptive Nudges", "Voice Recognition", "Shared Pacing"].map(s => (
                    <div key={s} className="flex justify-between items-center p-6 k-glass-panel">
                        <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
                        <div className="w-10 h-5 bg-indigo-500/20 rounded-full relative">
                            <div className="absolute top-1 right-1 w-3 h-3 bg-indigo-500 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
