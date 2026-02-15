"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function MobileTimelineDrawer({ isOpen, onClose, events }: any) {
    const { emotionalState } = useTheme();

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-end animate-fade-in`}
            onClick={onClose}
        >
            <div
                className={`
            w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border-t border-white/10 p-8 rounded-t-3xl min-h-[60vh] max-h-[85vh] overflow-y-auto 
            animate-slide-up shadow-[0_-20px_50px_rgba(0,0,0,0.5)]
            motion-${emotionalState}
        `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8 cursor-pointer" onClick={onClose} />

                <header className="mb-8">
                    <h2 className="text-xl font-black tracking-tight text-white uppercase italic">Timeline Ritual</h2>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mt-1">Ancestral Sequence • Record of Being</p>
                </header>

                <div className="space-y-8">
                    {events?.length > 0 ? events.map((event: any, idx: number) => (
                        <div key={idx} className="relative pl-6 border-l border-white/10">
                            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">{event.date}</div>
                            <div className="text-sm text-white font-medium">{event.title}</div>
                            <div className="text-xs text-white/60 mt-1 leading-relaxed">{event.description}</div>
                        </div>
                    )) : (
                        <div className="text-center py-20 opacity-20 italic">No events manifested in this sequence.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
