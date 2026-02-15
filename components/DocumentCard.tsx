// components/DocumentCard.tsx
"use client";

import Glass from "@/components/Glass";
import SlideUp from "@/components/SlideUp";
import DocumentIcon from "./DocumentIcon";
import { DocumentRecord } from "@/lib/documents";
import Link from "next/link";

export default function DocumentCard({ doc }: { doc: DocumentRecord }) {
    return (
        <SlideUp>
            <Glass className="flex gap-4 items-start p-4">
                <DocumentIcon type={doc.type} />

                <div className="flex flex-col gap-1 flex-1">
                    <div className="text-sm font-semibold text-slate-100">{doc.title}</div>
                    {doc.description && (
                        <div className="text-xs text-slate-400">{doc.description}</div>
                    )}
                    <div className="text-[10px] text-slate-500 mt-1">
                        Uploaded: {doc.uploadedAt}
                    </div>
                </div>

                <Link
                    href={`/documents/${doc.id}`}
                    className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                    View →
                </Link>
            </Glass>
        </SlideUp>
    );
}
