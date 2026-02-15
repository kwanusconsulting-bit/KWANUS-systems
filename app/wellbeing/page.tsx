"use client"

export const dynamic = "force-dynamic";

export default function WellbeingHome() {
    return (
        <main className="p-8 space-y-12">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">WELL-BEING</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Care & Emotional Safety Protocols</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {["Check-in", "Grounding", "Energy", "Reflection", "Pacing"].map(sec => (
                    <a
                        key={sec}
                        href={`/wellbeing/${sec.toLowerCase().replace(' ', '-')}`}
                        className="k-glass-panel p-8 space-y-4 hover:k-accent-border transition-all group"
                    >
                        <h2 className="text-xl font-black uppercase italic group-hover:k-accent">{sec}</h2>
                        <p className="text-[10px] font-medium uppercase opacity-40 leading-relaxed">
                            Access the {sec} module to maintain system-user resonance.
                        </p>
                    </a>
                ))}
            </div>
        </main>
    );
}
