"use client"

import React from 'react';
import { Button } from '@/components/ui/button';

export const EmotionalSafetySettings = () => {
    return (
        <div className="space-y-12">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic k-accent">Emotional Safety</h1>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">System-User Resonance Controls</p>
            </header>

            <section className="space-y-8">
                <div className="k-glass-panel p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest">Adaptive UI Intensity</label>
                        <input type="range" className="w-full accent-indigo-500 bg-white/5" min="0" max="100" />
                        <div className="flex justify-between text-[8px] font-bold opacity-40 uppercase tracking-widest">
                            <span>Subtle</span>
                            <span>Standard</span>
                            <span>Dynamic</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest leading-none">Pacing Sensitivity</h3>
                                <p className="text-[8px] opacity-40 uppercase tracking-[0.2em] mt-1">Detect user volatility & offer grounding</p>
                            </div>
                            <input type="checkbox" className="w-10 h-5 accent-indigo-500" defaultChecked />
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest leading-none">Grounding Rituals</h3>
                                <p className="text-[8px] opacity-40 uppercase tracking-[0.2em] mt-1">Automatic interventions when state falls</p>
                            </div>
                            <input type="checkbox" className="w-10 h-5 accent-indigo-500" defaultChecked />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="ghost" size="sm">Reset to Default</Button>
                    <Button variant="primary" size="sm">Seal Settings</Button>
                </div>
            </section>
        </div>
    );
};
