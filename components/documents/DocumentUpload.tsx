"use client";

import { useState } from "react";
import { GlassCard, GlassInput } from "@/components/ui";

interface DocumentUploadProps {
    onComplete?: () => void;
}

export default function DocumentUpload({ onComplete }: DocumentUploadProps) {
    const [form, setForm] = useState({ title: "", type: "LETTER", url: "" });
    const [loading, setLoading] = useState(false);

    async function handleUpload() {
        if (!form.title || !form.url) return;
        setLoading(true);
        try {
            const res = await fetch("/api/documents/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok && onComplete) {
                onComplete();
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <GlassCard className="p-8 space-y-6 border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] pointer-events-none" />

            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Manifest New Vessel</h2>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Add a document to the ceremonial archive</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Document Title</label>
                    <input
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all outline-none"
                        placeholder="e.g. Identity Verification - Q1"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Type Layer</label>
                    <select
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 outline-none appearance-none"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="LETTER">Letter</option>
                        <option value="ID">Identity</option>
                        <option value="ADDRESS">Proof of Address</option>
                        <option value="ACCOUNT">Account Evidence</option>
                        <option value="OTHER">Other Artifact</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Vessel URL (Simulated)</label>
                    <input
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 outline-none"
                        placeholder="https://..."
                        value={form.url}
                        onChange={(e) => setForm({ ...form, url: e.target.value })}
                    />
                </div>
            </div>

            <button
                onClick={handleUpload}
                disabled={loading || !form.title || !form.url}
                className="w-full py-4 rounded-xl bg-white text-slate-950 text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:hover:bg-white"
            >
                {loading ? "Manifesting..." : "Commit to Archive"}
            </button>
        </GlassCard>
    );
}
