import { prisma } from "@/lib/prisma";

export type ClimateType =
    | "STILLNESS"
    | "FLUX"
    | "ASCENT"
    | "DESCENT"
    | "STORM"
    | "BLOOM"
    | "RADIANCE";

export interface ClimateState {
    type: ClimateType;
    title: string;
    description: string;
    palette: {
        primary: string; // Tailwind class or hex
        accent: string;
        background: string; // Gradient definition
    };
}

export class ClimateEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async getClimate(): Promise<ClimateState> {
        const states = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: "desc" },
            take: 5,
        });


        // Default to Stillness if no data
        if (states.length === 0) return this.stillness();

        const recent = states[0];
        const variance = this.calculateVariance(states.map(s => s.intensity));

        // Adjusted thresholds to 0.0-1.0 scale
        const isRising = states.length >= 3 && states[0].intensity >= states[1].intensity;
        const isFalling = states.length >= 3 && states[0].intensity <= states[1].intensity;

        // 1. STORM: High volatility + High Intensity
        if (variance >= 0.04 && recent.intensity >= 0.7) {
            return {
                type: "STORM",
                title: "Internal Storm",
                description: "Your emotional field is turbulent. The universe surrounds you with protection.",
                palette: {
                    primary: "rose-500",
                    accent: "amber-400",
                    background: "bg-gradient-to-br from-rose-950 via-slate-900 to-black"
                }
            };
        }

        // 2. ASCENT: Rising trend + High Intensity
        if (isRising && recent.intensity >= 0.7) {
            return {
                type: "ASCENT",
                title: "Ascent",
                description: "Your emotional intensity is rising. The universe brightens with momentum.",
                palette: {
                    primary: "amber-400",
                    accent: "rose-300",
                    background: "bg-gradient-to-br from-amber-950/50 via-rose-950/30 to-black"
                }
            };
        }

        // 3. DESCENT: Falling trend + High Intensity (cooldown)
        if (isFalling && recent.intensity >= 0.7) {
            return {
                type: "DESCENT",
                title: "Descent",
                description: "Your emotional intensity is softening. The universe exhales with you.",
                palette: {
                    primary: "indigo-400",
                    accent: "violet-300",
                    background: "bg-gradient-to-br from-indigo-950/50 via-slate-950 to-black"
                }
            };
        }

        // 4. BLOOM: Falling trend + Low Intensity (Recovery)
        if (isFalling && recent.intensity <= 0.4) {
            return {
                type: "BLOOM",
                title: "Gentle Bloom",
                description: "You are recovering. The universe opens gently around you.",
                palette: {
                    primary: "emerald-400",
                    accent: "sky-300",
                    background: "bg-gradient-to-br from-emerald-950/50 via-sky-950/30 to-black"
                }
            };
        }

        // 5. RADIANCE: Rising trend + Low Intensity (Healthy momentum)
        if (isRising && recent.intensity <= 0.4) {
            return {
                type: "RADIANCE",
                title: "Radiance",
                description: "You are thriving. The universe glows with your momentum.",
                palette: {
                    primary: "sky-400",
                    accent: "amber-300",
                    background: "bg-gradient-to-br from-sky-950/50 via-amber-950/30 to-black"
                }
            };
        }

        // 6. FLUX: Moderate volatility
        if (variance >= 0.02) {
            return {
                type: "FLUX",
                title: "Flux",
                description: "Your emotional weather is shifting. The universe is in gentle motion.",
                palette: {
                    primary: "violet-400",
                    accent: "fuchsia-300",
                    background: "bg-gradient-to-br from-violet-950/50 via-fuchsia-950/30 to-black"
                }
            };
        }

        // Default: STILLNESS
        return this.stillness();
    }

    private stillness(): ClimateState {
        return {
            type: "STILLNESS",
            title: "Stillness",
            description: "The universe is quiet. Your emotional field is steady and grounded.",
            palette: {
                primary: "slate-400",
                accent: "indigo-300",
                background: "bg-gradient-to-br from-slate-950 via-gray-900 to-black"
            }
        };
    }

    private average(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }

    private calculateVariance(numbers: number[]): number {
        const avg = this.average(numbers);
        const squareDiffs = numbers.map(n => Math.pow(n - avg, 2));
        return this.average(squareDiffs);
    }
}
