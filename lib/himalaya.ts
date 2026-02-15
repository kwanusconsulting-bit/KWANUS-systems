// lib/himalaya.ts

import { EmotionalState } from "./emotion";

export type CreditState = "clean" | "mixed" | "heavy";
export type DisputeState = "none" | "active" | "multiple";
export type FundingState = "none" | "pending" | "inMotion";

export interface OSState {
    emotion: EmotionalState;
    credit: CreditState;
    disputes: DisputeState;
    funding: FundingState;
}

export function getHimalayaInsight(state: OSState) {
    const { emotion, credit, disputes, funding } = state;

    // Emotional layer
    const emotionalGuidance = {
        worst: "We’ll keep things small and grounded today.",
        neutral: "We’ll stay steady and focused.",
        progressing: "You’re moving well — let’s build gently.",
        thriving: "You’re in your flow — expansion is available.",
    }[emotion];

    // Credit layer
    const creditGuidance = {
        clean: "Your credit items are stable.",
        mixed: "There are a few areas worth attention.",
        heavy: "We’ll take this one piece at a time.",
    }[credit];

    // Dispute layer
    const disputeGuidance = {
        none: "No disputes need your attention.",
        active: "There’s a dispute in motion.",
        multiple: "Several disputes are moving — pacing matters.",
    }[disputes];

    // Funding layer
    const fundingGuidance = {
        none: "No funding apps in motion.",
        pending: "A lender is reviewing your documents.",
        inMotion: "Multiple funding apps are moving — stay steady.",
    }[funding];

    // Next right action logic
    let nextAction = "";
    if (disputes === "active") nextAction = "Review your active dispute.";
    else if (disputes === "multiple") nextAction = "Choose one dispute to focus on.";
    else if (funding === "pending") nextAction = "Upload any missing documents.";
    else if (credit === "mixed") nextAction = "Check your recent credit updates.";
    else nextAction = "Take one calm step forward.";

    return {
        emotionalGuidance,
        creditGuidance,
        disputeGuidance,
        fundingGuidance,
        nextAction,
    };
}
