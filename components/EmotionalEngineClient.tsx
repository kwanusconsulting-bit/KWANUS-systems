"use client";

import { useEmotionalStates } from "@/hooks/useEmotionalStates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EmotionalEngineClientProps {
    initialStates: any[];
}

export function EmotionalEngineClient({ initialStates }: EmotionalEngineClientProps) {
    const { states, record } = useEmotionalStates();
    // Use initial states if hook hasn't fetched yet? 
    // Actually hook fetches on mount. 
    // We can just use the hook for simplicity and simplicity of data flow.
    // Or we can pre-seed the hook. 
    // For now, let's keep the hook as primary source of truth for the list to keep it live.

    const [label, setLabel] = useState("");
    const [intensity, setIntensity] = useState(5);

    // Merge server states with client states if needed, or just let client fetch take over.
    // The user wants server-scoped data. The client hook calls the API which is now user-scoped.
    // So the client hook IS fetching user-scoped data correctly.
    // Passing initialStates is good for SSR (no flicker).

    const displayStates = states.length > 0 ? states : initialStates;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                    EMOTIONAL ENGINE
                </div>
                <div className="text-xl font-semibold mb-4">
                    Record how this moment actually feels.
                </div>

                <div className="mb-4">
                    <input
                        className="w-full mb-3 px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-sm"
                        placeholder="Label this state (e.g. 'anxious but hopeful')"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />

                    <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                        <span>Worst</span>
                        <span>Neutral</span>
                        <span>Thriving</span>
                    </div>

                    <input
                        type="range"
                        min={1}
                        max={10}
                        value={intensity}
                        onChange={(e) => setIntensity(Number(e.target.value))}
                        className="w-full"
                    />

                    <div className="mt-3">
                        <Button
                            onClick={() => {
                                if (!label.trim()) return;
                                record(label, intensity);
                                setLabel("");
                            }}
                        >
                            Save emotional state
                        </Button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">
                    RECENT STATES
                </div>
                <div className="space-y-3 max-h-72 overflow-auto pr-1">
                    {displayStates.map((s: any) => (
                        <div key={s.id} className="k-reflect k-depth-1 k-emotion-glow border-b border-white/10 pb-2 last:border-0">
                            <div className="text-sm font-medium">{s.label}</div>
                            <div className="text-[11px] text-white/50">
                                Intensity {s.intensity} ·{" "}
                                {new Date(s.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                    {displayStates.length === 0 && (
                        <div className="text-xs text-white/50">
                            No states recorded yet. The UI will adapt more as you log them.
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
