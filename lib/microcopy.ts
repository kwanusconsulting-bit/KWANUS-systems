// lib/microcopy.ts

import { EmotionalState } from "./emotion";
import { PersonaResponse } from "./persona";
import { getTone } from "./tone";

export interface MicroCopy {
    buttons: {
        primary: string;
        secondary: string;
        subtle: string;
    };
    emptyStates: {
        credit: string;
        disputes: string;
        funding: string;
    };
    confirmations: {
        action: string;
        submitted: string;
    };
    errors: {
        generic: string;
        pacing: string;
    };
    hints: {
        pacing: string;
        emotional: string;
    };
}

export function generateMicroCopy(
    emotion: EmotionalState,
    persona: PersonaResponse
): MicroCopy {
    const tone = getTone(emotion);

    return {
        buttons: {
            primary:
                emotion === "worst"
                    ? "Begin gently"
                    : emotion === "neutral"
                        ? "Continue"
                        : emotion === "progressing"
                            ? "Move forward"
                            : "Expand",

            secondary:
                emotion === "worst"
                    ? "Not now"
                    : emotion === "neutral"
                        ? "Maybe later"
                        : emotion === "progressing"
                            ? "Review"
                            : "Explore",

            subtle:
                emotion === "worst"
                    ? "Take a breath"
                    : emotion === "neutral"
                        ? "Hold steady"
                        : emotion === "progressing"
                            ? "Keep momentum"
                            : "Flow",
        },

        emptyStates: {
            credit:
                emotion === "worst"
                    ? "We’ll look at your credit items when you’re ready."
                    : "No credit items need attention right now.",

            disputes:
                emotion === "worst"
                    ? "No disputes to hold today."
                    : "You have no active disputes.",

            funding:
                emotion === "worst"
                    ? "No funding steps needed right now."
                    : "No funding applications in motion.",
        },

        confirmations: {
            action:
                emotion === "worst"
                    ? "One small step taken."
                    : emotion === "neutral"
                        ? "Action completed."
                        : emotion === "progressing"
                            ? "Good move."
                            : "Beautiful expansion.",

            submitted:
                emotion === "worst"
                    ? "Submitted gently."
                    : emotion === "neutral"
                        ? "Submitted."
                        : emotion === "progressing"
                            ? "Submitted with clarity."
                            : "Submitted with momentum.",
        },

        errors: {
            generic:
                emotion === "worst"
                    ? "Something felt heavy. Try again when you’re ready."
                    : "Something went wrong. Try again.",

            pacing:
                emotion === "worst"
                    ? "This step is too heavy right now."
                    : "Let’s slow this down.",
        },

        hints: {
            pacing: persona.pacing,
            emotional: persona.presence,
        },
    };
}
