import { EmotionalPosture } from "./emotional-field";

export type NavigationMode = "STABILIZING" | "STANDARD" | "MOMENTUM" | "EXPANSIVE";

export interface NavigationTransition {
    type: "FADE" | "STANDARD" | "SLIDE" | "LAYERED";
    speed: "SLOW" | "STEADY" | "FAST" | "DYNAMIC";
    branching: "MINIMAL" | "BALANCED" | "HIGH" | "MULTI_PATH";
}

export const NAVIGATION_MODES: Record<EmotionalPosture, NavigationTransition> = {
    WORST: {
        type: "FADE",
        speed: "SLOW",
        branching: "MINIMAL"
    },
    NEUTRAL: {
        type: "STANDARD",
        speed: "STEADY",
        branching: "BALANCED"
    },
    PROGRESSING: {
        type: "SLIDE",
        speed: "FAST",
        branching: "HIGH"
    },
    THRIVING: {
        type: "LAYERED",
        speed: "DYNAMIC",
        branching: "MULTI_PATH"
    }
};

export interface NavigationNode {
    id: string;
    label: string;
    path: string;
    subsystems: string[];
}

export const NAVIGATION_GRAPH: NavigationNode[] = [
    { id: "identity", label: "Identity Core", path: "/profile", subsystems: ["IDENTITY"] },
    { id: "credit", label: "Credit System", path: "/credit", subsystems: ["CREDIT"] },
    { id: "disputes", label: "Dispute System", path: "/disputes", subsystems: ["DISPUTE"] },
    { id: "funding", label: "Funding System", path: "/partners", subsystems: ["FUNDING"] },
    { id: "timeline", label: "Unified Timeline", path: "/timeline", subsystems: ["JOURNEY"] }
];

export class NavigationEngine {
    static getTransition(posture: EmotionalPosture): NavigationTransition {
        return NAVIGATION_MODES[posture];
    }

    static getNextPath(currentNode: string, trigger: string): string {
        // Logic for cross-system flows specified in Step 4
        switch (`${currentNode}->${trigger}`) {
            case "credit->dispute": return "/disputes";
            case "dispute->funding": return "/partners";
            case "funding->credit": return "/credit";
            default: return "/profile"; // Return to Identity Core by default
        }
    }
}
