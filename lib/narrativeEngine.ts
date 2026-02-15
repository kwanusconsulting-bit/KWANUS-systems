export function generateNarrative(user: any) {
    const events = [];

    // Emotional shifts
    const lastEmotion = user.emotionalSnapshots?.[0]; // Matching Prisma model name
    if (lastEmotion) {
        events.push({
            arc: "emotional",
            message: `You shifted into a state of ${lastEmotion.mode}.`,
            type: "emotional",
        });
    }

    // Dispute progress
    const drafting = user.disputes?.filter((d: any) => d.status === "OPEN" || d.emotionalTone === "drafting");
    if (drafting && drafting.length > 0) {
        events.push({
            arc: "repair",
            message: "You began repairing your financial story.",
            type: "progress",
        });
    }

    // Funding progress
    const pending = user.fundings?.filter((f: any) => f.status === "PENDING");
    if (pending && pending.length > 0) {
        events.push({
            arc: "expansion",
            message: "You opened a doorway to new financial possibilities.",
            type: "milestone",
        });
    }

    const personaFrames: Record<string, string> = {
        soft: "Gently, you moved into a new chapter:",
        balanced: "You progressed into a new chapter:",
        direct: "You advanced into a new chapter:",
    };

    return events.map((e) => ({
        ...e,
        message: `${personaFrames[user.personaMode] || personaFrames.balanced} ${e.message}`,
    }));
}
