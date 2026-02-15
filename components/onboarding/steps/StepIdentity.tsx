"use client";

import { useState } from "react";
import { GlassPanel, GlassInput, GlassButton, PersonaText } from "@/components/ui";

export default function StepIdentity({ onNext }: any) {
    const [form, setForm] = useState({ name: "", displayName: "" });
    const [loading, setLoading] = useState(false);

    async function save() {
        setLoading(true);
        try {
            // In a real implementation, this would call an API
            // Since we are mocking/building the UI layer
            // await fetch("/api/onboarding/identity", {
            //   method: "POST",
            //   body: JSON.stringify(form),
            // });

            // Simulate API lag
            await new Promise(r => setTimeout(r, 800));
            onNext();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <GlassPanel className="w-full space-y-8 p-8 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-white">Who are you?</h1>
                <PersonaText className="text-white/40 italic">
                    Name yourself within the OS kernel.
                </PersonaText>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Full Name</label>
                    <GlassInput
                        placeholder="e.g. John Doe"
                        value={form.name}
                        onChange={(e: any) => setForm({ ...form, name: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-white/30"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Display Name</label>
                    <GlassInput
                        placeholder="How you wish to be addressed"
                        value={form.displayName}
                        onChange={(e: any) => setForm({ ...form, displayName: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-white/30"
                    />
                </div>
            </div>

            <GlassButton
                onClick={save}
                disabled={!form.name || !form.displayName || loading}
                className="w-full py-3"
            >
                {loading ? "Synchronizing..." : "Continue"}
            </GlassButton>
        </GlassPanel>
    );
}
