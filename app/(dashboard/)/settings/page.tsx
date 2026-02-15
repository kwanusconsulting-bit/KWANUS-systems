export const dynamic = "force-dynamic";
import React from 'react';
import { Panel } from '@/components/ui/panel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <header>
                <h1 className="text-4xl font-black tracking-tighter italic">SETTINGS</h1>
                <p className="text-zinc-500 font-medium">Operational and spiritual preferences.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Nav */}
                <div className="space-y-1">
                    {['Profile', 'Emotion', 'Accessibility', 'Language', 'Privacy'].map((item) => (
                        <div key={item} className="px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white text-[10px] uppercase font-black tracking-widest cursor-pointer transition-colors">
                            {item}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <Panel className="md:col-span-3 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Steward Profile</h2>
                        <Input label="Display Name" placeholder="Nexus Steward" />
                        <Input label="Ceremonial Email" placeholder="steward@kwanus.nexus" />
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-4">
                        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Intelligence Mode</h2>
                        <div className="flex gap-4">
                            <Button variant="secondary" className="flex-1">Adaptive</Button>
                            <Button variant="secondary" className="flex-1">Locked</Button>
                        </div>
                    </div>

                    <Button className="w-full mt-8">Save Preferences</Button>
                </Panel>
            </div>
        </div>
    );
}
