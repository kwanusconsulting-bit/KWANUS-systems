"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import RitualOverlay from "@/components/os/rituals/RitualOverlay";
import TransitionRitual from "@/components/os/rituals/TransitionRitual";
import EmotionalRitual from "@/components/os/rituals/EmotionalRitual";
import PersonaRitual from "@/components/os/rituals/PersonaRitual";
import MilestoneRitual from "@/components/os/rituals/MilestoneRitual";

interface RitualContextType {
    triggerRitual: (type: string, data?: any) => void;
    activeRitual: string | null;
}

const RitualContext = createContext<RitualContextType | undefined>(undefined);

export function RitualProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [activeRitual, setActiveRitual] = useState<string | null>(null);
    const [ritualData, setRitualData] = useState<any>(null);

    // Initial Appearance / Refresh
    useEffect(() => {
        triggerRitual("arrival");
    }, []);

    // Transition Ritual on Route Change
    useEffect(() => {
        triggerRitual("transition");
    }, [pathname]);

    const triggerRitual = (type: string, data?: any) => {
        setActiveRitual(type);
        setRitualData(data);

        // Duration-based cleanup
        const duration = type === "milestone" ? 5000 : 2000;
        setTimeout(() => setActiveRitual(null), duration);
    };

    return (
        <RitualContext.Provider value={{ triggerRitual, activeRitual }}>
            {children}
            <AnimatePresence mode="wait">
                {activeRitual && (
                    <RitualOverlay key={activeRitual} type={activeRitual}>
                        {activeRitual === "transition" && <TransitionRitual />}
                        {activeRitual === "emotional" && <EmotionalRitual data={ritualData} />}
                        {activeRitual === "persona" && <PersonaRitual data={ritualData} />}
                        {activeRitual === "milestone" && <MilestoneRitual data={ritualData} />}
                    </RitualOverlay>
                )}
            </AnimatePresence>
        </RitualContext.Provider>
    );
}

export const useRituals = () => {
    const context = useContext(RitualContext);
    if (!context) throw new Error("useRituals must be used within RitualProvider");
    return context;
};
