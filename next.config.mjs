import { getSecurityHeaders } from "./lib/security/headers.ts";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {},
    headers: async () => [
        {
            source: "/:path*",
            headers: getSecurityHeaders()
        }
    ]
};

export default nextConfig;
