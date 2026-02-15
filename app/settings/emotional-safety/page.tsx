"use client"

export const dynamic = "force-dynamic";

export default function SafetyPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">EMOTIONAL SAFETY</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Threshold Sensitivity & Protection Protocols</p>
            </header>
            <div className="max-w-xl space-y-8">
                {["Intensity Limit", "Grounding Frequency", "Auto-Pacing Reset", "Safe Mode Override"].map(s => (
                    <div key={s} className="flex justify-between items-center p-6 k-glass-panel hover:k-accent-border transition-all">
                        <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
                        <div className="w-10 h-5 bg-white/5 rounded-full relative">
                            <div className="absolute top-1 right-1 w-3 h-3 bg-white/20 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
