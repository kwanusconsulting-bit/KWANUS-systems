export function interpretEmotion(history: any[]) {
    if (!history || history.length < 2) return null;

    const last = history[0];
    const prev = history[1];

    // Emotional transitions
    if (prev.state !== last.state) {
        return {
            type: "transition",
            message: `You moved from ${prev.state} to ${last.state}.`,
        };
    }

    // Emotional intensity changes
    if (last.intensity > prev.intensity) {
        return {
            type: "intensifying",
            message: "Your emotional state is intensifying.",
        };
    }

    if (last.intensity < prev.intensity) {
        return {
            type: "softening",
            message: "Your emotional state is softening.",
        };
    }

    return null;
}
