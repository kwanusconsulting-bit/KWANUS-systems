import { rateLimit } from "./rate-limit";
import { logger } from "@/lib/utils/logger";

export async function safeApi(
    handler: (req: Request) => Promise<any>,
    req: Request
): Promise<Response> {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Rate limiting
    if (!rateLimit(ip)) {
        logger.warn("Rate limit exceeded", { ip });
        return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            {
                status: 429,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    try {
        const result = await handler(req);
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        logger.error("API Error", err);

        return new Response(
            JSON.stringify({
                error: "Internal server error",
                message: process.env.NODE_ENV === "production" ? undefined : err.message
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
