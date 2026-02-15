// components/DocumentIcon.tsx
"use client";

import { DocumentType } from "@/lib/documents";

export default function DocumentIcon({ type }: { type: DocumentType }) {
    const base = "h-8 w-8 flex items-center justify-center rounded-xl border text-sm";

    switch (type) {
        case "dispute-letter":
            return (
                <div className={`${base} border-sky-400/40 bg-sky-400/10 text-sky-300`}>
                    ✉️
                </div>
            );
        case "bureau-response":
            return (
                <div className={`${base} border-rose-400/40 bg-rose-400/10 text-rose-300`}>
                    🏛️
                </div>
            );
        case "funding-document":
            return (
                <div className={`${base} border-amber-400/40 bg-amber-400/10 text-amber-300`}>
                    💼
                </div>
            );
        case "identity-document":
            return (
                <div className={`${base} border-emerald-400/40 bg-emerald-400/10 text-emerald-300`}>
                    🪪
                </div>
            );
        case "system-generated":
            return (
                <div className={`${base} border-slate-400/40 bg-slate-400/10 text-slate-300`}>
                    ⚙️
                </div>
            );
        case "upload":
            return (
                <div className={`${base} border-purple-400/40 bg-purple-400/10 text-purple-300`}>
                    📄
                </div>
            );
    }
}
