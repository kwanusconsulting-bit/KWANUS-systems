export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { prisma } from "@/lib/prisma";
import { safeApi } from "@/lib/safe-api";

// ST-2: The Steward's Senses
// Deep diagnostics endpoint
export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized");

        // Fetch raw data for the "Sensing" layer
        // This is raw, un-smoothed data that the Steward can look at to see "under the hood"
        const rawStates = await prisma.emotionalSnapshot.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        const intensities = rawStates.map(s => s.intensity);
        const variance = calculateVariance(intensities);

        return {
            sensing: {
                raw_field_variance: variance,
                coherence_index: variance < 2 ? "HIGH" : "LOW", // Low variance = High coherence
                pulse_frequency: rawStates.length, // Activity level
                deep_scan: "ACTIVE"
            }
        };
    }, req);
}

function calculateVariance(nums: number[]) {
    if (nums.length === 0) return 0;
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    return nums.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / nums.length;
}
