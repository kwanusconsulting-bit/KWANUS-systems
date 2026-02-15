// lib/navigation.ts

import { OSState } from "./himalaya";

export interface NavigationNode {
    label: string;
    path: string;
    priority: number; // higher = more visible
    visible: boolean;
    emotionalWeight: "light" | "neutral" | "heavy";
}

export function generateNavigation(state: OSState): NavigationNode[] {
    const { emotion, disputes, funding } = state;

    // Emotional visibility logic
    const emotionalVisibility =
        emotion === "worst"
            ? 0.5
            : emotion === "neutral"
                ? 0.8
                : emotion === "progressing"
                    ? 1
                    : 1.2;

    const nodes: NavigationNode[] = [
        {
            label: "Overview",
            path: "/dashboard",
            priority: 10 * emotionalVisibility,
            visible: true,
            emotionalWeight: "light",
        },
        {
            label: "Credit Items",
            path: "/dashboard/credit-items",
            priority: 8 * emotionalVisibility,
            visible: emotion !== "worst",
            emotionalWeight: "neutral",
        },
        {
            label: "Disputes",
            path: "/dashboard/disputes",
            priority:
                disputes === "active"
                    ? 12 * emotionalVisibility
                    : disputes === "multiple"
                        ? 14 * emotionalVisibility
                        : 6 * emotionalVisibility,
            visible: true,
            emotionalWeight: disputes === "active" ? "heavy" : "neutral",
        },
        {
            label: "Funding",
            path: "/dashboard/funding",
            priority:
                funding === "pending"
                    ? 11 * emotionalVisibility
                    : funding === "inMotion"
                        ? 13 * emotionalVisibility
                        : 5 * emotionalVisibility,
            visible: emotion !== "worst",
            emotionalWeight: funding === "pending" ? "heavy" : "neutral",
        },
        {
            label: "Identity",
            path: "/dashboard/identity",
            priority: 4 * emotionalVisibility,
            visible: true,
            emotionalWeight: "light",
        },
        {
            label: "Timeline",
            path: "/dashboard/timeline",
            priority: 3 * emotionalVisibility,
            visible: emotion !== "worst",
            emotionalWeight: "light",
        },
        {
            label: "Notifications",
            path: "/dashboard/notifications",
            priority: 2 * emotionalVisibility,
            visible: true,
            emotionalWeight: "light",
        },
        {
            label: "Settings",
            path: "/dashboard/settings",
            priority: 1 * emotionalVisibility,
            visible: true,
            emotionalWeight: "light",
        },
    ];

    // Sort by priority
    return nodes.sort((a, b) => b.priority - a.priority);
}
