import { prisma } from "@/lib/prisma";

export interface ParsedCreditItem {
    creditorName: string;
    accountNumber?: string;
    status: string;
    balance?: number;
}

export class AnalysisEngine {
    static analyze(status: string) {
        const lowerStatus = status.toLowerCase();
        const isNegative =
            lowerStatus.includes("late") ||
            lowerStatus.includes("collection") ||
            lowerStatus.includes("charge-off") ||
            lowerStatus.includes("dispute");

        return {
            isNegative,
            severity: isNegative ? ("HIGH" as const) : ("LOW" as const),
            tags: isNegative ? ["Negative", status] : ["Positive"]
        };
    }

    static calculateReadiness(items: any[]) {
        const negatives = items.filter(i => i.isNegative).length;
        if (negatives === 0) return 85;
        if (negatives < 3) return 65;
        return 45;
    }
}

export class ReportParser {
    static async parse(rawContent: string): Promise<ParsedCreditItem[]> {
        console.log(`[Parser] Analyzing raw content (length: ${rawContent.length})...`);
        return parseReportText(rawContent);
    }

    static async recordItems(userId: string, reportId: string, items: ParsedCreditItem[]) {
        const analyzed = analyzeItems(items);
        const data = analyzed.map(item => ({
            userId,
            reportId,
            creditorName: item.creditorName,
            accountNumber: item.accountNumber,
            status: item.status,
            balance: item.balance,
            isNegative: item.isNegative,
            isDisputed: false
        }));

        await Promise.all(data.map(item => (prisma.creditItem as any).create({ data: item })));
        return data.length;
    }
}

export function parseReportText(_text: string): ParsedCreditItem[] {
    // Mock parsing logic
    return [
        {
            creditorName: "JPMCB CARD",
            accountNumber: "XXXX1234",
            status: "Collection/Charge-off",
            balance: 1240.50
        },
        {
            creditorName: "CAPITAL ONE",
            accountNumber: "XXXX5678",
            status: "Late 30 Days",
            balance: 350.00
        },
        {
            creditorName: "STUDENT LOAN CORP",
            accountNumber: "XXXX9012",
            status: "Open/Never Late",
            balance: 15400.00
        }
    ];
}

export function analyzeItems(items: ParsedCreditItem[]) {
    return items.map(item => ({
        ...item,
        isNegative: AnalysisEngine.analyze(item.status).isNegative
    }));
}
