"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { GlassPanel, GlassButton, PersonaText, GlassCard } from "@/components/ui";

export default function StepPersona({ onNext }: any) {
    const { setPersonaMode } = useTheme();

    function choose(mode: string) {
        setPersonaMode(mode as any);
        onNext();
    }

    return (
        <GlassPanel className="w-full space-y-8 p-8 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-white">How should I speak to you?</h1>
                <PersonaText className="text-white/40 italic">
                    Choose the tone that resonates with your path.
                </PersonaText>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <GlassCard
                    onClick={() => choose("soft")}
                    className="p-4 cursor-pointer hover:bg-white/10 border-white/5 transition-all flex items-center justify-between group"
                >
                    <div className="flex flex-col">
                        <span className="text-white font-bold">Soft (Himalaya)</span>
                        <span className="text-[11px] text-white/40 italic">Gentle, safe, and grounding guidance.</span>
                    </div>
                    <span className="text-xl group-hover:scale-110 transition-transform">🌸</span>
                </GlassCard>

                <GlassCard
                    onClick={() => choose("balanced")}
                    className="p-4 cursor-pointer hover:bg-white/10 border-white/5 transition-all flex items-center justify-between group"
                >
                    <div className="flex flex-col">
                        <span className="text-white font-bold">Balanced</span>
                        <span className="text-[11px] text-white/40 italic">A harmonic blend of clarity and momentum.</span>
                    </div>
                    <span className="text-xl group-hover:scale-110 transition-transform">⚖️</span>
                </GlassCard>

                <GlassCard
                    onClick={() => choose("direct")}
                    className="p-4 cursor-pointer hover:bg-white/10 border-white/5 transition-all flex items-center justify-between group"
                >
                    <div className="flex flex-col">
                        <span className="text-white font-bold">Direct (Kai)</span>
                        <span className="text-[11px] text-white/40 italic">Precise, movement-driven, and active.</span>
                    </div>
                    <span className="text-xl group-hover:scale-110 transition-transform">⚡</span>
                </GlassCard>
            </div>
        </GlassPanel>
    );
}
