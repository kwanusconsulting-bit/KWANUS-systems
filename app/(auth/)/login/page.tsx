export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-black">
            <Panel className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-black tracking-tighter text-white italic">KWANUS</h1>
                    <p className="mt-2 text-zinc-500 font-medium">Identity Verification Ceremony</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-zinc-600 font-bold ml-1">Steward Identity</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                            placeholder="steward.nexus"
                        />
                    </div>
                    <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-colors">
                        Enter NEXUS
                    </button>
                </form>
            </Panel>
        </main>
    );
}
