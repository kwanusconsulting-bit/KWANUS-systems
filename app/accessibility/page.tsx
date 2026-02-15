"use client"

export const dynamic = "force-dynamic";

export default function AccessibilityPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">ACCESSIBILITY</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Inclusive Interaction & Visual Governance</p>
            </header>

            <div className="max-w-2xl space-y-12">
                <section className="k-glass-panel p-10 space-y-8">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Visual Protocols</h2>
                    <div className="space-y-6">
                        {[
                            { label: "High Contrast Mode", desc: "Maximizes luminance delta for better legibility." },
                            { label: "Reduced Motion", desc: "Minimizes ceremonial animations and transitions." },
                            { label: "Force Neutral Palette", desc: "Overrides emotional-adaptive color shifts." },
                            { label: "Dyslexia Friendly Font", desc: "Switches typography to high-readability weighting." }
                        ].map(p => (
                            <div key={p.label} className="flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest">{p.label}</div>
                                    <div className="text-[8px] font-bold opacity-40 uppercase mt-1">{p.desc}</div>
                                </div>
                                <div className="w-10 h-5 bg-white/10 rounded-full relative">
                                    <div className="absolute top-1 left-1 w-3 h-3 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="k-glass-panel p-10 space-y-8">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Interaction Pacing</h2>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">System Force Multiplier</label>
                        <input type="range" className="w-full accent-indigo-500" />
                        <div className="flex justify-between text-[8px] font-bold uppercase opacity-30">
                            <span>Slow (0.5x)</span>
                            <span>Normal (1.0x)</span>
                            <span>Fast (2.0x)</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
