export function sanitizeForConsultantView<T extends Record<string, any>>(data: T): T {
    const clone = structuredClone(data);

    delete clone.userId;
    delete clone.internalNotes;
    delete clone.sensitiveMetadata;

    return clone;
}
