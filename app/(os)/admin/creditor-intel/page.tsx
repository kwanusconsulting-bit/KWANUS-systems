"use client";

import React, { useEffect, useState } from "react";

interface Creditor {
    id: string;
    name: string;
    normalized: string;
    category?: string;
    addresses: { bureau: string; address: string }[];
    bureauRules: { bureau: string; preferredDisputeType?: string; notes?: string }[];
}

export default function CreditorIntelPage() {
    const [creditors, setCreditors] = useState<Creditor[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "", category: "", bureau: "EX", address: "", preferredDisputeType: "", notes: ""
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");

    const load = () => {
        setLoading(true);
        fetch("/api/creditors")
            .then(r => r.json())
            .then(d => { if (Array.isArray(d)) setCreditors(d); })
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMsg("");
        try {
            const res = await fetch("/api/creditors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (res.ok) { setMsg("Saved."); load(); setForm({ name: "", category: "", bureau: "EX", address: "", preferredDisputeType: "", notes: "" }); }
            else { const d = await res.json(); setMsg(`Error: ${d.error}`); }
        } finally { setSaving(false); }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Creditor Intelligence</h1>

            <form onSubmit={handleSubmit} className="space-y-3 p-6 border border-white/10 rounded-2xl bg-white/5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/60">Add / Update Creditor</h2>
                {[
                    { label: "Creditor Name *", key: "name", placeholder: "e.g. Capital One" },
                    { label: "Category", key: "category", placeholder: "e.g. CREDIT_CARD" },
                    { label: "Mailing Address", key: "address", placeholder: "Full mailing address for bureau" },
                    { label: "Preferred Dispute Type", key: "preferredDisputeType", placeholder: "e.g. FACTUAL_DISPUTE" },
                    { label: "Notes", key: "notes", placeholder: "Any bureau-specific notes" },
                ].map(f => (
                    <div key={f.key}>
                        <label className="text-xs text-white/40 uppercase tracking-widest">{f.label}</label>
                        <input
                            className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm focus:outline-none"
                            placeholder={f.placeholder}
                            value={(form as any)[f.key]}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        />
                    </div>
                ))}
                <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest">Bureau</label>
                    <select
                        className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm"
                        value={form.bureau}
                        onChange={e => setForm(p => ({ ...p, bureau: e.target.value }))}
                    >
                        <option value="EX">Experian (EX)</option>
                        <option value="EQ">Equifax (EQ)</option>
                        <option value="TU">TransUnion (TU)</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={saving || !form.name}
                    className="px-6 py-2 text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg disabled:opacity-40"
                >
                    {saving ? "Saving..." : "Save Creditor"}
                </button>
                {msg && <p className="text-xs text-white/50">{msg}</p>}
            </form>

            <div className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/60">
                    Creditor Registry ({creditors.length})
                </h2>
                {loading && <p className="text-white/30 text-sm">Loading...</p>}
                {creditors.map(c => (
                    <div key={c.id} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-1">
                        <div className="flex justify-between">
                            <span className="font-bold text-white">{c.name}</span>
                            {c.category && <span className="text-xs text-white/40 uppercase">{c.category}</span>}
                        </div>
                        <div className="text-xs text-white/40">
                            Addresses: {c.addresses.map(a => `${a.bureau}`).join(", ") || "None"}
                        </div>
                        <div className="text-xs text-white/40">
                            Rules: {c.bureauRules.map(r => `${r.bureau}→${r.preferredDisputeType ?? "?"}`).join(", ") || "None"}
                        </div>
                    </div>
                ))}
                {!loading && creditors.length === 0 && (
                    <p className="text-white/20 text-sm font-mono">NO CREDITORS YET</p>
                )}
            </div>
        </div>
    );
}
