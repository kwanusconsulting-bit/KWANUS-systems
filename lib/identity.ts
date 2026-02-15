// lib/identity.ts

import { EmotionalState } from "./emotion";
import { CreditState, DisputeState, FundingState } from "./himalaya";

export interface UserIdentity {
    name: string;
    emotionalState: EmotionalState;
    creditState: CreditState;
    disputeState: DisputeState;
    fundingState: FundingState;
    verified: boolean;
    lastActive: Date;
    notes?: string[];
}

export function createIdentity(data: Partial<UserIdentity>): UserIdentity {
    return {
        name: data.name ?? "User",
        emotionalState: data.emotionalState ?? "neutral",
        creditState: data.creditState ?? "mixed",
        disputeState: data.disputeState ?? "none",
        fundingState: data.fundingState ?? "none",
        verified: data.verified ?? false,
        lastActive: data.lastActive ?? new Date(),
        notes: data.notes ?? [],
    };
}

export function getIdentitySummary(identity: UserIdentity) {
    return {
        greeting:
            identity.emotionalState === "worst"
                ? "You're here. That's enough."
                : identity.emotionalState === "neutral"
                    ? "Steady and clear."
                    : identity.emotionalState === "progressing"
                        ? "You're moving forward."
                        : "You're in your flow.",

        verification: identity.verified
            ? "StewardVerified"
            : "Verification Pending",

        emotionalBadge: identity.emotionalState,
        creditBadge: identity.creditState,
        disputeBadge: identity.disputeState,
        fundingBadge: identity.fundingState,

        lastActive: identity.lastActive.toLocaleString(),
        notes: identity.notes,
    };
}
