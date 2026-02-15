"use client"

export const dynamic = "force-dynamic";

export default function GroundingPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">GROUNDING TOOLS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Stabilization Protocols & Centering Guides</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {["Breathing 0x4", "Neutral Void", "Rhythm Anchor"].map(tool => (
                    <div key={tool} className="k-glass-panel p-10 space-y-6 hover:k-accent-border cursor-pointer transition-all text-center">
                        <div className="w-16 h-16 rounded-full border border-white/10 mx-auto flex items-center justify-center text-2xl">⚓</div>
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">{tool}</h2>
                        <button className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 italic">Initiate Sequence</button>
                    </div>
                ))}
            </div>
        </main>
    );
}
