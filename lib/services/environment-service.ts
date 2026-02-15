import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export class EnvironmentService {
    static validate() {
        try {
            envSchema.parse(process.env);
            console.log("✅ [D-1] Environment Variables Sealed & Validated");
        } catch (error) {
            console.error("❌ [D-1] Critical Environment Error:", error);
            throw new Error("Invalid Environment Configuration");
        }
    }
}

// Auto-validate on import in production
if (process.env.NODE_ENV === 'production') {
    EnvironmentService.validate();
}
