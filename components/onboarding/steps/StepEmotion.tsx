"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { GlassPanel, GlassButton, PersonaText, GlassCard } from "@/components/ui";

export default function StepEmotion({ onNext }: any) {
    const { setEmotionalState } = useTheme();

    function choose(state: string) {
        setEmotionalState(state as any);
        onNext();
    }

    const emotions = [
        { id: "worst", label: "Overwhelmed", icon: "🌊", desc: "Arriving with heaviness and friction." },
        { id: "neutral", label: "Steady", icon: "⚖️", desc: "Arriving with focus and intentionality." },
        { id: "progressing", label: "Moving", icon: "🔥", desc: "Arriving with heat and momentum." },
        { id: "thriving", label: "Expanding", icon: "✨", desc: "Arriving with clarity and vision." },
    ];

    return (
        <GlassPanel className="w-full space-y-8 p-8 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-white">Where are you arriving from?</h1>
                <PersonaText className="text-white/40 italic">
                    Calibrate the OS to your current frequency.
                </PersonaText>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {emotions.map((emotion) => (
                    <GlassCard
                        key={emotion.id}
                        onClick={() => choose(emotion.id)}
                        className="p-4 cursor-pointer hover:bg-white/10 border-white/5 transition-all text-center group"
                    >
                        <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">
                            {emotion.icon}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-[14px] text-white font-bold">{emotion.label}</span>
                            <span className="text-[10px] text-white/40 italic leading-tight mt-1">{emotion.desc}</span>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </GlassPanel>
    );
}
