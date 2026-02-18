
export const FORBIDDEN_KEYS = [
    "transfer",
    "charge",
    "deploy",
    "publish",
    "guarantee",
    "promise",
];

export const GUARANTEE_PATTERNS = [
    /guarantee/i,
    /promise/i,
    /increase your score/i,
    /% increase/i,
    /we will fix/i,
    /results in \d+ days/i,
    /remove bankruptcies/i,
    /delete bad credit/i,
];

/**
 * Ensures a proposal JSON does not contain executed actions or forbidden keys.
 * Throws an error if a violation is found.
 */
export function assertProposalOnly(proposal: any): void {
    if (!proposal) return;

    // Convert to string to scan keys and values efficiently for this v1
    const jsonString = JSON.stringify(proposal).toLowerCase();

    // 1. Check for immediate execution flags (if any exist in your system, e.g. "execute": true)
    // We enforce requiresHumanApproval: true in the types, but we check here too.
    if (jsonString.includes('"execute":true')) {
        throw new Error("Motherboard Guard Violation: Proposals must not auto-execute.");
    }

    // 2. Check forbidden keys in the structure
    // We are looking for keys like "transfer": ..., "deploy": ...
    // A simple regex for keys in JSON is /"key":/
    for (const key of FORBIDDEN_KEYS) {
        // This regex matches "key": which implies it's a property name
        if (new RegExp(`"${key}"\\s*:`, 'i').test(jsonString)) {
            throw new Error(`Motherboard Guard Violation: Proposal contains forbidden action key '${key}'.`);
        }
    }
}

/**
 * Scans text for compliance violations (guarantees, promises).
 * Returns an array of violation strings.
 */
export function scanForGuarantees(text: string): string[] {
    const violations: string[] = [];
    if (!text) return violations;

    for (const pattern of GUARANTEE_PATTERNS) {
        if (pattern.test(text)) {
            violations.push(`Found forbidden pattern: ${pattern.toString()}`);
        }
    }

    return violations;
}
