// lib/email/templates.ts

export const EmailTemplates = {
    disputeCreated: (userId: string) => ({
        subject: "Your dispute has been created",
        body: `Your dispute is now active. You can track progress in your dashboard.\n\nUser: ${userId}`,
    }),

    roundCreated: (roundNumber: number) => ({
        subject: `Round ${roundNumber} started`,
        body: `A new dispute round has been created.\nRound: ${roundNumber}`,
    }),

    letterGenerated: () => ({
        subject: "Your dispute letter is ready",
        body: "A new dispute letter has been generated and added to your timeline.",
    }),

    fundingScoreReady: (score: number) => ({
        subject: "Your funding score is ready",
        body: `Your funding readiness score is ${score}. You can now view matched offers.`,
    }),

    fundingApplicationSubmitted: () => ({
        subject: "Your funding application has been submitted",
        body: "Your application has been sent. We’ll notify you when the bank responds.",
    }),

    onboardingWelcome: () => ({
        subject: "Welcome to KWANUS OS",
        body: "Your account is ready. Begin your journey anytime.",
    }),

    adminAlert: (message: string) => ({
        subject: "Admin Alert",
        body: message,
    }),
}
