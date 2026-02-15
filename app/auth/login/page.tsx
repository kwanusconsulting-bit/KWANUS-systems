"use client"

export const dynamic = "force-dynamic";

import { useState } from "react"
import { useAuth } from "@/components/auth/AuthProvider"

export default function LoginPage() {
    const [name, setName] = useState("")
    const { login } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim()) {
            login(name)
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* ADAPTIVE BACKGROUND */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-background to-background" />

            <div className="relative z-10 w-full max-w-md space-y-12 animate-fade-in">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-indigo-500 flex items-center justify-center p-2 mb-8">
                        <div className="w-full h-full rounded-full bg-indigo-500 animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic k-accent">INITIATE ALIGNMENT</h1>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-40">Access the KWANUS OS Terminal</p>
                </div>

                <form onSubmit={handleSubmit} className="k-glass-panel p-10 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-1">Steward Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:k-accent-border outline-none transition-all font-black uppercase tracking-widest placeholder:opacity-20"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        ENTER THE OS
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-20">MMXXVI — THE FINAL SEAL — KWANUS SYSTEMS LLC</p>
                </div>
            </div>
        </main>
    )
}
