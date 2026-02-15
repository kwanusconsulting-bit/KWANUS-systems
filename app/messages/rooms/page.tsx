"use client"

export const dynamic = "force-dynamic";

export default function CollaborationRooms() {
    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">COLLABORATION ROOMS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Shared Multi-Modal Workspaces</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {["Alpha Node", "Beta Core", "Delta Pulse"].map(room => (
                    <div key={room} className="k-glass-panel p-10 space-y-6 hover:k-accent-border cursor-pointer transition-all">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">{room}</h2>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/5 border border-white/10" />)}
                        </div>
                        <p className="text-[10px] font-bold uppercase opacity-40">4 Stewards Active</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
