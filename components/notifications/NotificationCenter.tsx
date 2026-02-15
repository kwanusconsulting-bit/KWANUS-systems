"use client"

import React, { useState, useEffect } from 'react';
import { eventRouter } from '@/lib/events/router';
import { KwanusEvent } from '@/lib/events/types';

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<KwanusEvent[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Listen for all events (mocking the Layer check for now)
        eventRouter.on('*', (event) => {
            setNotifications(prev => [event, ...prev.slice(0, 19)]);
        });
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center relative hover:bg-white/5 transition-colors"
            >
                <span className="text-lg opacity-40">⚑</span>
                {notifications.length > 0 && (
                    <div className="absolute top-2 right-2 w-2 h-2 k-accent-bg rounded-full shadow-[0_0_8px_var(--ui-glow)]" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-80 k-glass-panel max-h-[500px] overflow-hidden flex flex-col z-[100] animate-k-fade">
                    <header className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40">Frequency Pulse</h3>
                        <button onClick={() => setNotifications([])} className="text-[8px] font-bold uppercase opacity-20 hover:opacity-100 italic transition-opacity">Clear All</button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-none">
                        {notifications.length === 0 ? (
                            <div className="py-12 text-center opacity-20 italic text-[10px] tracking-widest">No active transmissions.</div>
                        ) : (
                            notifications.map((notif) => (
                                <div key={notif.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-white/10 transition-colors group">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[8px] font-black uppercase k-accent tracking-tighter">{notif.domain}</span>
                                        <span className="text-[8px] opacity-20 font-bold">{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest leading-none">{notif.type.replace('_', ' ')}</h4>
                                    <div className="text-[8px] opacity-40 leading-relaxed uppercase overflow-hidden text-ellipsis whitespace-nowrap">
                                        Data linked to session resonance...
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
