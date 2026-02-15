// app/dashboard/identity/page.tsx
import React from "react";
import { getEmotionTheme, EmotionalState } from "@/lib/emotion";

export default function IdentityUploadPage() {
    // TEMP: Hardcoded until backend is wired
    const emotionalState: EmotionalState = "progressing"; // worst | neutral | progressing | thriving
    const theme = getEmotionTheme(emotionalState);

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-6 py-10">
            {/* Adaptive Glow Background */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div
                    className={`absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr ${theme.bgGlow} animate-glowPulse`}
                />
                <div
                    className={`absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr ${theme.bgGlow} animate-glowPulse`}
                />
            </div>

            <div className="relative w-full max-w-md animate-slide-up">
                {/* Outer glow ring */}
                <div className={`absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr ${theme.bgGlow} blur-2xl opacity-70 animate-glowPulse`} />

                {/* Card */}
                <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-10 shadow-2xl backdrop-blur-2xl animate-breathe">
                    <h1 className="text-center text-xl font-semibold tracking-tight text-slate-50">
                        Identity Verification
                    </h1>

                    <p className="mt-2 text-center text-xs text-slate-400">
                        Drag and drop your ID & SSN
                    </p>

                    {/* Upload zone */}
                    <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/40 p-10 backdrop-blur-xl hover:animate-drift transition-all duration-500">
                        <div className={`h-40 w-40 rounded-full bg-gradient-to-tr ${theme.cardGlow} blur-xl animate-glowPulse`} />

                        <div className="relative -mt-32 flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 shadow-inner shadow-black/40 backdrop-blur-xl">
                            <span className="text-xs text-slate-400">Drop files</span>
                        </div>

                        <button className={`mt-6 rounded-full bg-gradient-to-tr ${theme.bgGlow.replace('from-', 'from-emerald-400 ').replace('via-', 'via-cyan-400 ').replace('to-', 'to-sky-500')} px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all`}>
                            Choose File
                        </button>

                        <p className="mt-3 text-[0.65rem] text-slate-500">PDF, PNG, JPG</p>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-[0.65rem] text-slate-500 italic">
                        Your documents are encrypted and anchored in the living OS.
                    </p>
                </div>
            </div>
        </main>
    );
}
