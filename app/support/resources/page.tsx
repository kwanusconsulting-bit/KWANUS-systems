"use client"

export const dynamic = "force-dynamic";

export default function SupportResources() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">SUPPORT DIRECTORY</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Grounding Guides & Emotional Literacy</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {["Emotional Literacy 101", "Grounding for Paces", "Nexus Safety Protocol"].map(res => (
                    <div key={res} className="k-glass-panel p-10 space-y-4 hover:k-accent-border transition-all cursor-pointer">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">{res}</h2>
                        <p className="text-[10px] font-bold uppercase opacity-40 leading-relaxed">Essential wisdom for high-harmonic creative expansion.</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
