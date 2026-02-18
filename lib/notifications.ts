// lib/notifications.ts

// import { EmotionalState } from "./emotion";
import { OSState } from "./himalaya";

export interface Notification {
    id: string;
    title?: string;
    message: string;
    type?: string;
    priority?: "low" | "medium" | "high";
    emotionalWeight?: "light" | "neutral" | "heavy";
    createdAt: Date;
    read?: boolean;
}

export type NotificationType = string;

export function generateNotifications(state: OSState): Notification[] {
    const notifications: Notification[] = [];

    // Emotional pacing logic
    const pacing = {
        worst: 1,
        neutral: 2,
        progressing: 3,
        thriving: 4,
    }[state.emotion];

    // 1. Dispute notifications
    if (state.disputes === "active") {
        notifications.push({
            id: "dispute-active",
            title: "Your dispute is moving",
            message: pacing <= 2
                ? "We’ll keep this gentle. You can review it when you’re ready."
                : "Your dispute is in motion — review the latest update.",
            priority: pacing <= 2 ? "low" : "medium",
            emotionalWeight: pacing <= 2 ? "light" : "neutral",
            createdAt: new Date(),
        });
    }

    // 2. Funding notifications
    if (state.funding === "pending") {
        notifications.push({
            id: "funding-pending",
            title: "A lender needs one more document",
            message: pacing <= 2
                ? "No rush — we’ll surface this again when you’re steadier."
                : "Upload your income verification to keep things moving.",
            priority: pacing <= 2 ? "low" : "high",
            emotionalWeight: pacing <= 2 ? "light" : "heavy",
            createdAt: new Date(),
        });
    }

    // 3. Emotional state updates
    notifications.push({
        id: "emotion-update",
        title: "Your emotional state has shifted",
        message:
            state.emotion === "worst"
                ? "We’ll keep today small and grounded."
                : state.emotion === "neutral"
                    ? "You’re steady — we’ll move with clarity."
                    : state.emotion === "progressing"
                        ? "You’re moving well — momentum is available."
                        : "You’re thriving — expansion is open.",
        priority: "low",
        emotionalWeight: "light",
        createdAt: new Date(),
    });

    return notifications;
}
