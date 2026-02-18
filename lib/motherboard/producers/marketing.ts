import { scanTextCompliance, ComplianceOutcome } from "./compliance";

export interface MarketingInput {
    offer: string;
    audience: string;
}

export interface AdVariant {
    id: string;
    headline: string;
    body: string;
    cta: string;
    compliance: ComplianceOutcome;
}

export interface MarketingResult {
    variants: AdVariant[];
    campaignContext: MarketingInput;
}

export function generateMarketingCampaign(input: MarketingInput): MarketingResult {
    const variants: AdVariant[] = [];

    const h1 = `Attention ${input.audience}: Verify Your ${input.offer} Status Today`;
    const b1 = `We help ${input.audience} review their ${input.offer} history. Challenge unverifiable errors with precision.`;
    variants.push({ id: "variant-1-direct", headline: h1, body: b1, cta: "Start Review", compliance: scanTextCompliance(h1 + " " + b1) });

    const h2 = `How ${input.audience} Can Properly Audit Their ${input.offer}`;
    const b2 = `You have the right to a fair and accurate ${input.offer} file. Our process helps identify items that may need verification.`;
    variants.push({ id: "variant-2-edu", headline: h2, body: b2, cta: "Learn More", compliance: scanTextCompliance(h2 + " " + b2) });

    const h3 = `Is Your ${input.offer} Report Telling the Full Story?`;
    const b3 = `Many ${input.audience} find their files contain outdated data. We help you ask the right questions to the bureaus.`;
    variants.push({ id: "variant-3-soft", headline: h3, body: b3, cta: "Check Now", compliance: scanTextCompliance(h3 + " " + b3) });

    return { variants, campaignContext: input };
}
