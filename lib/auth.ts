import { auth, currentUser } from "@clerk/nextjs/server";

export function createClient() {
    // This is a legacy function for Supabase clients. 
    // Returning null to prevent errors in existing code.
    return null;
}

export async function getCurrentUser() {
    const { userId } = await auth();

    if (!userId) {
        if (process.env.NODE_ENV === "development") {
            return { id: "demo-user", email: "demo@example.com" };
        }
        throw new Error("Unauthorized");
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
        throw new Error("User not found in Clerk");
    }

    return {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || ""
    };
}
