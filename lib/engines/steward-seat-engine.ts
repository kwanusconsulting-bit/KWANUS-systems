import { EmotionalPosture } from "./emotional-field";
import { SystemEvent } from "./timeline-aggregator";
import { StewardshipSnapshot, StewardSensingEngine } from "./steward-sensing-engine";

export interface SeatPerception extends StewardshipSnapshot {
    focus: "FINANCIAL" | "EMOTIONAL" | "NARRATIVE";
    clarityLevel: number; // 0.0 to 1.0
    isSeatOccupied: boolean;
}

export class StewardSeatEngine {
    /**
     * Defines the Steward's Seat (Step 2 Vantage Point).
     * Provides the focal point for integrated universe guidance.
     */
    static getPerception(posture: EmotionalPosture, events: SystemEvent[]): SeatPerception {
        const sensing = StewardSensingEngine.sense(posture, events);
        return {
            ...sensing,
            focus: this.determineFocus(events),
            clarityLevel: this.calculateClarity(sensing),
            isSeatOccupied: true
        };
    }

    private static determineFocus(events: SystemEvent[]): "FINANCIAL" | "EMOTIONAL" | "NARRATIVE" {
        if (events.length === 0) return "NARRATIVE";
        const latest = events[0];
        if (latest.node === "CREDIT" || latest.node === "FUNDING") return "FINANCIAL";
        if (latest.node === "EMOTIONAL") return "EMOTIONAL";
        return "NARRATIVE";
    }

    private static calculateClarity(_sensing: StewardshipSnapshot): number {
        // Higher clarity when harmonic state matches postural needs
        return 0.8;
    }

    /**
     * Guidance Control Rule: SOFT_INFLUENCE
     * Provides micro-adjustment parameters for OS guidance.
     */
    static getGuidanceControl(perception: SeatPerception) {
        return {
            influenceMode: perception.posture === "WORST" ? "GROUNDING" : "GUIDING",
            transitionBuffer: (perception.harmonicProfile?.pacingWeight || 1) * 100,
            toneAdjustment: perception.coherence?.messagingVoice === "SOFT_SUPPORTIVE" ? 0.1 : 0.0
        };
    }
}
