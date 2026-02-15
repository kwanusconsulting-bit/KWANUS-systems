"use client"

export const dynamic = "force-dynamic";

export default function UserManagementPage() {
    const users = [
        { name: "Steward-Alpha", role: "Prime", status: "Active", harmonic: "0.92" },
        { name: "Steward-Beta", role: "Guardian", status: "Active", harmonic: "0.85" },
        { name: "Steward-Gamma", role: "Observer", status: "Standby", harmonic: "0.42" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving k-accent-indigo">
            <header className="border-b border-indigo-500/10 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-indigo-400">USER MANAGEMENT</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40 text-indigo-300">Identity Governance & Role Assignment</p>
            </header>

            <div className="k-glass-panel overflow-hidden border-indigo-500/20">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-indigo-500/10 bg-indigo-500/5">
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Identity</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Role</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Status</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Harmonic</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-500/10">
                        {users.map((u, i) => (
                            <tr key={i} className="hover:bg-indigo-500/5 transition-colors">
                                <td className="p-6 text-xs font-black uppercase italic">{u.name}</td>
                                <td className="p-6 text-[10px] font-bold uppercase opacity-60">{u.role}</td>
                                <td className="p-6">
                                    <span className="text-[8px] font-black uppercase bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">{u.status}</span>
                                </td>
                                <td className="p-6 text-xs font-black italic text-indigo-400">{u.harmonic}</td>
                                <td className="p-6">
                                    <button className="text-[8px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity">Edit Protocol</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
