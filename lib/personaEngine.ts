export function interpretPersona(mode: string) {
    const profiles: Record<string, any> = {
        soft: {
            tone: "gentle",
            pacing: "slow",
            motion: "ease-in-out",
            color: "white/70",
            voice: "Himalaya whispers",
        },
        balanced: {
            tone: "neutral",
            pacing: "steady",
            motion: "ease-out",
            color: "white/90",
            voice: "Your OS notes",
        },
        direct: {
            tone: "sharp",
            pacing: "fast",
            motion: "cubic-bezier(0.2,0.8,0.4,1)",
            color: "white",
            voice: "Kai signals",
        },
    };

    return profiles[mode] || profiles.balanced;
}
