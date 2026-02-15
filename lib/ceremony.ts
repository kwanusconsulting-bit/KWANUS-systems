// lib/ceremony.ts

import { OSState } from "./himalaya";

export interface CeremonyStep {
    label: string;
    pacing: "slow" | "steady" | "gentle" | "accelerated";
    emotionalTone: string;
    action: string;
}

export function generateCeremony(state: OSState): CeremonyStep[] {
    const { emotion, disputes, funding } = state;

    // Emotional pacing logic
    const pacing =
        emotion === "worst"
            ? "slow"
            : emotion === "neutral"
                ? "steady"
                : emotion === "progressing"
                    ? "gentle"
                    : "accelerated";

    const steps: CeremonyStep[] = [];

    // Step 1 — Grounding
    steps.push({
        label:
            emotion === "worst"
                ? "Ground yourself"
                : emotion === "neutral"
                    ? "Settle in"
                    : emotion === "progressing"
                        ? "Find your rhythm"
                        : "You’re already in motion",
        pacing,
        emotionalTone:
            emotion === "worst"
                ? "We’ll keep this small and calm."
                : emotion === "neutral"
                    ? "We’ll move with clarity."
                    : emotion === "progressing"
                        ? "Momentum is available."
                        : "Expansion is open.",
        action: "Acknowledge your current state.",
    });

    // Step 2 — Credit or Dispute Focus
    if (disputes === "active") {
        steps.push({
            label: "Review your active dispute",
            pacing,
            emotionalTone:
                pacing === "slow"
                    ? "No rush — you can look when you’re ready."
                    : "Your dispute is moving — clarity is available.",
            action: "Open the dispute details.",
        });
    } else if (funding === "pending") {
        steps.push({
            label: "Funding in motion",
            pacing,
            emotionalTone:
                pacing === "slow"
                    ? "We’ll surface this again when you’re steadier."
                    : "A lender needs one more document.",
            action: "Upload the requested document.",
        });
    } else {
        steps.push({
            label: "Check your credit items",
            pacing,
            emotionalTone:
                pacing === "slow"
                    ? "We’ll keep this gentle."
                    : "You’re in a good place to review.",
            action: "Open your credit overview.",
        });
    }

    // Step 3 — Next Right Action
    steps.push({
        label: "Next right action",
        pacing,
        emotionalTone:
            pacing === "slow"
                ? "One small step is enough."
                : pacing === "steady"
                    ? "Here’s the next clear move."
                    : pacing === "gentle"
                        ? "You’re building momentum."
                        : "You’re ready for expansion.",
        action:
            disputes === "active"
                ? "Review dispute timeline."
                : funding === "pending"
                    ? "Upload verification."
                    : "Review recent credit changes.",
    });

    return steps;
}
