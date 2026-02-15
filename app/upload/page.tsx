"use client"

export const dynamic = "force-dynamic";;

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function IdentityPage() {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleUpload = async () => {
        setIsUploading(true);
        setStatus("Securing connection...");

        try {
            // 1. Upload/Record Report
            setStatus("Recording report entry...");

            // Create a dummy file for now as we don't have a file input ref yet
            // In a real scenario, this would come from a file input
            const dummyFile = new File(["dummy credit report content"], "report.pdf", { type: "application/pdf" });
            const formData = new FormData();
            formData.append("file", dummyFile);

            const uploadRes = await fetch("/api/reports/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Upload failed");

            const { reportId, rawText } = await uploadRes.json();

            // 2. Trigger Analysis
            setStatus("Analyzing credit items...");
            const analyzeRes = await fetch("/api/reports/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reportId, rawText }),
            });

            if (!analyzeRes.ok) throw new Error("Analysis failed");

            setStatus("Success! Redirecting...");

            // 3. Success Redirect
            setTimeout(() => {
                router.push("/dashboard/credit");
            }, 1000);

        } catch (error) {
            console.error("Upload failed:", error);
            setStatus("Error: Failed to process document.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="max-w-lg w-full text-center py-10">
                <div className="k-still k-bloom k-emotion-glow k-quiet mx-auto mb-6 w-40 h-40 rounded-full bg-gradient-to-tr from-purple-500 via-sky-400 to-emerald-400 opacity-80 blur-[1px]" />
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                    IDENTITY & CREDIT DOCUMENTS
                </div>
                <div className="text-2xl font-semibold mb-2">Initialize your profile</div>
                <p className="text-sm text-white/60 mb-6 px-8">
                    Upload your credit report (PDF) to begin the analysis.
                    Our system will securely parse your data and identify dispute opportunities.
                </p>

                <div className="border border-dashed border-white/25 rounded-2xl py-10 mb-4 bg-black/30 mx-8">
                    {status ? (
                        <div className="animate-pulse text-sm text-primary font-medium">
                            {status}
                        </div>
                    ) : (
                        <>
                            <div className="text-xs text-white/60 mb-2">
                                Drag and drop your report here
                            </div>
                            <div className="text-[11px] text-white/40">Accepted: PDF (Experian, TransUnion, Equifax)</div>
                        </>
                    )}
                </div>

                <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-40 mx-auto"
                >
                    {isUploading ? "Processing..." : "Choose File"}
                </Button>
            </Card>
        </div>
    );
}
