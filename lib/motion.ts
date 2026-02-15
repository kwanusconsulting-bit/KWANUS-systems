// lib/motion.ts

import { EmotionalState } from "./emotionalState";

export const motionTokens: Record<
    EmotionalState,
    {
        duration: string;
        easing: string;
        intensity: number;
    }
> = {
    worst: {
        duration: "600ms",
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        intensity: 0.2,
    },
    neutral: {
        duration: "450ms",
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        intensity: 0.4,
    },
    progressing: {
        duration: "350ms",
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        intensity: 0.6,
    },
    thriving: {
        duration: "250ms",
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        intensity: 0.9,
    },
};
