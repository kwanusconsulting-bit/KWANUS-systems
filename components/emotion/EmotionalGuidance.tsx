"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { PersonaText } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";

export default function EmotionalGuidance() {
    const { emotionalState, personaMode } = useTheme();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const messages: Record<string, Record<string, string>> = {
            worst: {
                soft: "You’re safe. We’ll move gently.",
                balanced: "Let’s take this one step at a time.",
                direct: "We’ll stabilize and move forward.",
            },
            neutral: {
                soft: "You’re steady. I’m here with you.",
                balanced: "You’re centered. Let’s continue.",
                direct: "You’re ready. Let’s move.",
            },
            progressing: {
                soft: "You’re rising. I’m with you.",
                balanced: "You’re gaining momentum.",
                direct: "You’re accelerating. Keep going.",
            },
            thriving: {
                soft: "You’re glowing. Let’s honor this.",
                balanced: "You’re thriving. Let’s expand.",
                direct: "You’re powerful. Push forward.",
            },
        };

        setMessage(messages[emotionalState]?.[personaMode] || messages.neutral.balanced);
    }, [emotionalState, personaMode]);

    const personaVoices: Record<string, string> = {
        soft: "Himalaya:",
        balanced: "OS:",
        direct: "Kai:",
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={`${emotionalState}-${personaMode}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.5 }}
            >
                <PersonaText className="text-xs italic text-white/60">
                    <span className="font-bold mr-2 text-white/40 tracking-widest">
                        {personaVoices[personaMode]}
                    </span>
                    {message}
                </PersonaText>
            </motion.div>
        </AnimatePresence>
    );
}
