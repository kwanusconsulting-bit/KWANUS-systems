"use client";

import Link from "next/link";
import { useState } from "react";
import DisputeStageTracker from "./DisputeStageTracker";
import DisputePersonaGuidance from "./DisputePersonaGuidance";
import DocumentViewer from "@/components/documents/DocumentViewer";
import { GlassCard, GlassPanel, PageHeader } from "@/components/ui";

export default function DisputeWorkspace({ dispute }: any) {
    const documents = dispute?.evidence || [];
    const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);

    if (!dispute) return (
        <div className="p-20 text-center">
            <h1 className="text-2xl text-white/60">Dispute not found in the repair chamber.</h1>
        </div>
    );

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header */}
            <PageHeader
                title={dispute.creditorName || dispute.accountName || "Repair Chamber"}
                subtitle={`Bureau: ${dispute.bureau} • Account: ${dispute.accountNumber}`}
                emotionalState="neutral"
            />

            {/* Stage Tracker */}
            <DisputeStageTracker stage={dispute.status || "drafting"} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Persona Guidance */}
                    <DisputePersonaGuidance dispute={dispute} />

                    {/* Document Viewer Area */}
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-4 ml-2">Ceremonial Document Layer</h3>
                        {selectedDoc ? (
                            <DocumentViewer document={selectedDoc} />
                        ) : (
                            <GlassPanel className="h-[50vh] flex flex-col items-center justify-center text-center p-8">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4">📄</div>
                                <p className="text-white/60">No documents selected for viewing.</p>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2">Select a vessel from the grid below</p>
                            </GlassPanel>
                        )}
                    </section>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 ml-2">Evidence Vessels</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {documents?.length > 0 ? (
                            documents.map((doc: any) => (
                                <button
                                    key={doc.id}
                                    onClick={() => setSelectedDoc(doc)}
                                    className={`
                    group relative overflow-hidden text-left p-5 rounded-2xl border transition-all duration-300
                    ${selectedDoc?.id === doc.id
                                            ? "bg-white/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                            : "bg-slate-950/40 border-white/10 hover:border-white/20 hover:bg-white/5"
                                        }
                  `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center text-xl
                      ${selectedDoc?.id === doc.id ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/40"}
                    `}>
                                            {doc.type === 'letter' ? '✉️' : '📄'}
                                        </div>
                                        <div>
                                            <div className={`font-semibold text-sm ${selectedDoc?.id === doc.id ? "text-white" : "text-white/70"}`}>
                                                {doc.title || doc.name || "Untitled Vessel"}
                                            </div>
                                            <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">
                                                {doc.type} • {new Date(doc.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    {selectedDoc?.id === doc.id && (
                                        <div className="absolute top-0 right-0 h-full w-1 bg-emerald-500" />
                                    )}
                                </button>
                            ))
                        ) : (
                            <p className="text-xs text-white/40 italic p-4">No documents have been manifested for this dispute.</p>
                        )}

                        <Link
                            href={`/dashboard/documents/upload?disputeId=${dispute.id}`}
                            className="group mt-4 flex items-center justify-center p-4 rounded-2xl border border-dashed border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-xs font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400"
                        >
                            + Manifest New Document
                        </Link>
                    </div>

                    <GlassCard className="mt-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">System Identity</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[11px]">
                                <span className="text-white/40">Kernel ID</span>
                                <span className="font-mono text-white/60">{dispute.id.slice(0, 8)}</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                                <span className="text-white/40">Last Synced</span>
                                <span className="text-white/60">{new Date(dispute.updatedAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
