"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState<"INTRO" | "MOTHERBOARD" | "COMPLETE">("INTRO");

    const runMotherboard = () => {
        setStep("MOTHERBOARD");
        // Simulate analysis delay for user perception of work
        setTimeout(() => {
            setStep("COMPLETE");
        }, 2500);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-4">
            {step === "INTRO" && (
                <div className="max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <span className="text-2xl">⚡️</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Initialize System</h1>
                    <p className="text-white/60 mb-8">
                        We will scan your credit profile, calculate your Funding Readiness, and identify dispute opportunities.
                    </p>
                    <button
                        onClick={runMotherboard}
                        className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Run Motherboard Analysis
                    </button>
                    <div className="mt-6 text-xs text-white/30">
                        By clicking "Run Analysis", you agree to our Terms and authorize this scan.
                    </div>
                </div>
            )}

            {step === "MOTHERBOARD" && (
                <div className="max-w-md text-center">
                    <div className="mb-8 relative">
                        <div className="w-24 h-24 rounded-full border-t-2 border-indigo-500 animate-spin mx-auto" />
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-indigo-400">
                            SCANNING
                        </div>
                    </div>
                    <div className="space-y-2 font-mono text-sm text-white/60">
                        <p className="animate-pulse">Accessing bureau data...</p>
                        <p className="animate-pulse delay-700">Identifying negative items...</p>
                        <p className="animate-pulse delay-1000">Calculating deletion probability...</p>
                    </div>
                </div>
            )}

            {step === "COMPLETE" && (
                <div className="max-w-md text-center animate-in zoom-in duration-500">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-6 text-emerald-400 text-3xl">
                        ✓
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Analysis Complete</h1>
                    <p className="text-white/60 mb-8">
                        We found actionable dispute items and calculated your funding readiness.
                    </p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full py-4 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
                    >
                        Enter Dashboard
                    </button>
                </div>
            )}
        </main>
    );
}
