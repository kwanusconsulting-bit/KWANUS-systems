import { GUARANTEE_PATTERNS } from "../guards";

export interface ComplianceViolation {
    rule: string;
    snippet: string;
    suggestion: string;
}

export interface ComplianceOutcome {
    violations: ComplianceViolation[];
    safeRewriteSuggestions: string[];
    isCompliant: boolean;
}

const REWRITE_SUGGESTIONS: Record<string, string> = {
    "guarantee": "Use 'we work to resolve' instead.",
    "promise": "Avoid promising outcomes. Focus on the method.",
    "increase your score": "Say 'helps optimize your profile' instead.",
    "% increase": "Do not cite specific percentage increases.",
    "we will fix": "Say 'we will challenge' or 'we will dispute'.",
    "results in": "Do not promise timeframes.",
    "remove bankruptcies": "Say 'challenge unverifiable items'.",
    "delete bad credit": "Say 'helps ensure your report is accurate and fair'."
};

export function scanTextCompliance(text: string): ComplianceOutcome {
    const violations: ComplianceViolation[] = [];
    const lowerText = text.toLowerCase();

    for (const pattern of GUARANTEE_PATTERNS) {
        if (pattern.test(lowerText)) {
            const match = text.match(pattern);
            const snippet = match ? match[0] : pattern.source;

            let suggestion = "Review for guaranteed language.";
            for (const key in REWRITE_SUGGESTIONS) {
                if (new RegExp(key, "i").test(snippet)) {
                    suggestion = REWRITE_SUGGESTIONS[key];
                    break;
                }
            }

            violations.push({ rule: "No Guarantees / No Result Promises", snippet, suggestion });
        }
    }

    return {
        violations,
        safeRewriteSuggestions: violations.map(v => `${v.snippet} -> ${v.suggestion}`),
        isCompliant: violations.length === 0
    };
}
