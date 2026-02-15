import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ContextRegistry } from "@/providers/ContextRegistry";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: appConfig.name,
    description: appConfig.description
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="min-h-screen bg-slate-950 text-slate-50">
                    <ContextRegistry>
                        {children}
                    </ContextRegistry>
                </body>
            </html>
        </ClerkProvider>
    );
}
