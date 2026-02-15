"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/client/api";
import { motion, AnimatePresence } from "framer-motion";

interface Ritual {
    id: string;
    type: string;
    title: string;
    description: string;
    steps: string[];
    durationSeconds: number;
    tone: "CALMING" | "GROUNDING" | "UPLIFTING" | "ELEVATING";
}

export function RitualPanel() {
    const [rituals, setRituals] = useState<Ritual[]>([]);
    const [activeRitual, setActiveRitual] = useState<Ritual | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGet("/api/rituals")
            .then((data: any) => {
                setRituals(data.rituals);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleStartRitual = (ritual: Ritual) => {
        setActiveRitual(ritual);
        setCurrentStepIndex(0);
    };

    const handleNextStep = () => {
        if (!activeRitual) return;
        if (currentStepIndex < activeRitual.steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            // Completed
            setActiveRitual(null);
            setCurrentStepIndex(0);
            // Ideally log completion here
        }
    };

    if (loading || rituals.length === 0) return null;

    return (
        <div className="mb-8 k-fade-in delay-200">
            <AnimatePresence mode="wait">
                {!activeRitual ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rituals.map((ritual) => (
                            <Card key={ritual.id} className="k-card k-depth-1 hover:k-depth-2 transition-all duration-500 group relative border border-white/5 overflow-hidden">
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700
                             ${ritual.tone === 'CALMING' ? 'bg-blue-500' : ''}
                             ${ritual.tone === 'GROUNDING' ? 'bg-emerald-500' : ''}
                             ${ritual.tone === 'UPLIFTING' ? 'bg-amber-500' : ''}
                             ${ritual.tone === 'ELEVATING' ? 'bg-violet-500' : ''}
                        `} />

                                <div className="p-5 relative z-10">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40">Ritual</span>
                                        <span className="text-[10px] text-white/30">{ritual.durationSeconds}s</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-white/90 mb-2">{ritual.title}</h3>
                                    <p className="text-sm text-white/60 mb-6">{ritual.description}</p>

                                    <Button
                                        onClick={() => handleStartRitual(ritual)}
                                        className="w-full border-white/10 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        Begin
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full"
                    >
                        <Card className="k-card k-depth-3 border-none bg-black/40 backdrop-blur-xl p-8 md:p-12 text-center relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
                            <div className={`absolute inset-0 opacity-20 animate-pulse-slow
                         ${activeRitual.tone === 'CALMING' ? 'bg-blue-900/30' : ''}
                         ${activeRitual.tone === 'GROUNDING' ? 'bg-emerald-900/30' : ''}
                         ${activeRitual.tone === 'UPLIFTING' ? 'bg-amber-900/30' : ''}
                         ${activeRitual.tone === 'ELEVATING' ? 'bg-violet-900/30' : ''}
                    `} />

                            <div className="relative z-10 max-w-lg mx-auto">
                                <motion.div
                                    key={currentStepIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-8 leading-relaxed">
                                        {activeRitual.steps[currentStepIndex]}
                                    </h2>
                                </motion.div>

                                <Button
                                    onClick={handleNextStep}
                                    className="bg-white/10 hover:bg-white/20 text-white border-none rounded-full px-8 py-6 text-lg transition-all"
                                >
                                    {currentStepIndex < activeRitual.steps.length - 1 ? "Check" : "Complete"}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
