export interface LetterTemplate {
    id: string;
    name: string;
    content: string;
}

export const LETTER_TEMPLATES: Record<string, LetterTemplate> = {
    "account-validation": {
        id: "account-validation",
        name: "Validation Request (Section 609)",
        content: `
[Date]

[Bureau Name]
[Bureau Address]

Re: Validation Request for Account [Account Number]

To Whom It May Concern,

I am writing to dispute the following information in my file, which I have circled on the attached report. I have verified with the creditor that this account is reporting inaccurately.

Account Name: [Creditor Name]
Account Number: [Account Number]

Please validate this account pursuant to Section 609 of the Fair Credit Reporting Act. If you cannot verify the accuracy of this item within 30 days, please delete it immediately.

Sincerely,

[User Name]
[User Address]
        `.trim(),
    },
    // Add more templates here
};

export function generateLetter(templateId: string, data: Record<string, string>): string {
    const template = LETTER_TEMPLATES[templateId];
    if (!template) throw new Error("Template not found");

    let content = template.content;
    for (const [key, value] of Object.entries(data)) {
        content = content.replace(new RegExp(`\\[${key}\\]`, "g"), value);
    }
    return content;
}
