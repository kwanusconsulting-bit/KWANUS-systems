import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        status: "ok",
        message: "KWANUS OS API is running",
        timestamp: new Date().toISOString(),
        routes: {
            homepage: "/",
            about: "/about",
            features: "/features",
            pricing: "/pricing",
            contact: "/contact"
        }
    });
}
