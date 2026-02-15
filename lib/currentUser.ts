import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
    const { userId } = await auth();

    if (!userId) {
        if (process.env.NODE_ENV === "development") {
            // Check for demo user in Prisma
            let demoUser = await prisma.user.findUnique({
                where: { id: "demo-user" }
            });
            if (!demoUser) {
                demoUser = await prisma.user.create({
                    data: {
                        id: "demo-user",
                        email: "demo@example.com",
                        name: "Demo User"
                    }
                });
            }
            return demoUser;
        }
        return null;
    }

    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress || `${userId}@kwanus.ai`;

    let user = await prisma.user.findUnique({
        where: { id: userId } // Use Clerk ID directly
    });

    if (!user) {
        // First-time user creation
        user = await prisma.user.create({
            data: {
                id: userId,
                email: email,
                name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim() : "Steward"
            }
        });

        // First-time initialization
        await prisma.journey.create({
            data: {
                title: "Entered the universe",
                description: "The beginning of your KWANUS journey",
                userId: user.id
            }
        });

        await prisma.creditProfile.create({
            data: {
                score: 650,
                userId: user.id
            }
        });

        await prisma.emotionalSnapshot.create({
            data: {
                mode: "neutral",
                intensity: 0.7,
                userId: user.id,
                notes: "Initial resonance"
            }
        });
    }

    return user;
}
