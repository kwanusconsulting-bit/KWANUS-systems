"use client"

export const dynamic = "force-dynamic";

export default function ResourceLibrary() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">RESOURCE LIBRARY</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Artifacts, Templates & System Wisdom</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {["OS Guide", "Harmonic Templates", "Partner Specs", "Ritual Codex"].map(item => (
                    <div key={item} className="k-glass-panel p-8 space-y-4 hover:k-accent-border transition-all cursor-pointer">
                        <div className="text-xs font-black uppercase tracking-widest">{item}</div>
                    </div>
                ))}
            </div>
        </main>
    );
}
