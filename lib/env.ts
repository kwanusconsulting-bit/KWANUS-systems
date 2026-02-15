export const env = {
    appEnv: process.env.NEXT_PUBLIC_APP_ENV,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnon: process.env.SUPABASE_ANON_KEY,
    supabaseService: process.env.SUPABASE_SERVICE_ROLE_KEY,
    databaseUrl: process.env.DATABASE_URL
};

export function validateEnv() {
    const required = {
        DATABASE_URL: env.databaseUrl,
        NEXT_PUBLIC_APP_ENV: env.appEnv
    };

    const missing = Object.entries(required)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}
