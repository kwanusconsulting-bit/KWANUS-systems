// lib/documents.ts

export type DocumentType =
    | "dispute-letter"
    | "bureau-response"
    | "funding-document"
    | "identity-document"
    | "system-generated"
    | "upload";

export interface DocumentRecord {
    id: string;
    type: DocumentType;
    title: string;
    description?: string;
    uploadedAt: string;
    url: string; // PDF or file URL
}
