"use client"

export const dynamic = "force-dynamic";

import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
            <Panel className="w-full max-w-md p-12 space-y-12">
                <header className="text-center space-y-4">
                    <div className="inline-block p-4 rounded-full border border-white/10 k-glow mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-sm" />
                    </div>
                    <h1 className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">Identity Birth</h1>
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic">INITIATE NEXUS</h2>
                </header>

                <div className="space-y-6">
                    <Input label="Identity Name" placeholder="The Steward" />
                    <Input label="Nexus Address" placeholder="steward@nexus.prime" type="email" />
                    <Input label="Resonance Key" placeholder="••••••••" type="password" />
                </div>

                <div className="space-y-4 pt-4">
                    <Button className="w-full" variant="mythic" size="lg">START CEREMONY</Button>
                    <p className="text-center text-[10px] font-bold opacity-30 tracking-widest uppercase">
                        Already born? <Link href="/login" className="hover:text-white transition-colors">Enter here</Link>
                    </p>
                </div>
            </Panel>
        </div>
    );
}
