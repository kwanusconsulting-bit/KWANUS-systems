"use client"

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">PROJECTS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Lineage Collections & Resource Bundles</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="k-glass-panel p-12 space-y-8 group hover:k-accent-border cursor-pointer transition-all">
                    <div className="w-12 h-1 bg-indigo-500" />
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">OS Expansion V2</h2>
                    <p className="text-[10px] font-bold uppercase opacity-40">12 Tasks • 4 Contributors • 85% Complete</p>
                </div>
            </div>
        </main>
    );
}
