"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui";

export default function IdentityEdit({ user }: any) {
    const [form, setForm] = useState({
        displayName: user?.displayName || "",
        fullName: user?.fullName || "",
        address: user?.address || "",
    });
    const [loading, setLoading] = useState(false);

    async function save() {
        setLoading(true);
        try {
            const res = await fetch("/api/settings/identity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <GlassCard className="p-8 space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Modify Identity Vessel</h2>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Update your core signal parameters</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Display Designation</label>
                    <input
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 outline-none"
                        placeholder="e.g. Ka'Moni"
                        value={form.displayName}
                        onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Legal Identity</label>
                    <input
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 outline-none"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Anchor Point (Address)</label>
                    <input
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 outline-none"
                        placeholder="Residential Path"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                </div>
            </div>

            <button
                onClick={save}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all disabled:opacity-50"
            >
                {loading ? "Syncing..." : "Commit Changes"}
            </button>
        </GlassCard>
    );
}
