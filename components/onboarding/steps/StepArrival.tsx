"use client";

import { GlassPanel, GlassButton } from "@/components/ui";
import { useTheme } from "@/providers/ThemeProvider";

export default function StepArrival({ onNext }: any) {
    const { emotionalState } = useTheme();

    const messages: Record<string, string> = {
        worst: "You’re here. Let’s begin gently.",
        neutral: "Welcome. Let’s move with clarity.",
        progressing: "You’re ready. Let’s continue.",
        thriving: "Momentum is with you. Let’s begin.",
    };

    return (
        <GlassPanel className="w-full text-center space-y-8 p-8 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    {messages[emotionalState] || messages.neutral}
                </h1>
                <p className="text-slate-400 text-sm italic font-serif">
                    The KWANUS OS has been waiting for your return.
                </p>
            </div>
            <GlassButton
                onClick={onNext}
                className="px-12 py-3 text-lg"
            >
                Begin
            </GlassButton>
        </GlassPanel>
    );
}
