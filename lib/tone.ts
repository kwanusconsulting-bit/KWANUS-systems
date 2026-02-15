// lib/tone.ts

import { EmotionalState } from "./emotion";

export function getTone(state: EmotionalState) {
    switch (state) {
        case "worst":
            return {
                greeting: "You're here. That's enough.",
                pacing: "We’ll keep things slow and simple.",
                nextAction: "One small step is all that’s needed.",
                reassurance: "You’re not behind. You’re not failing.",
            };

        case "neutral":
            return {
                greeting: "Steady and clear.",
                pacing: "We’ll keep things focused and grounded.",
                nextAction: "Here’s the next right move.",
                reassurance: "You’re in a good place to continue.",
            };

        case "progressing":
            return {
                greeting: "You’re moving forward.",
                pacing: "Let’s keep the momentum gentle but real.",
                nextAction: "Here’s the next step to build on your progress.",
                reassurance: "You’re doing well. Keep going.",
            };

        case "thriving":
            return {
                greeting: "You’re in your flow.",
                pacing: "We can move with clarity and confidence.",
                nextAction: "Here’s your next expansion point.",
                reassurance: "You’re aligned. Everything is working.",
            };
    }
}
