
export type LetterTemplateName = "initial" | "follow_up" | "final"

export const letterTemplates: Record<LetterTemplateName, string> = {
    initial: `
[Your Name]
[Your Address]
[City, State ZIP]

[Date]

[Creditor/Bureau Name]
[Creditor/Bureau Address]
[City, State ZIP]

RE: Investigation Request for Inaccurate Information

To Whom It May Concern,

I am writing to dispute the following information on my credit report. The item listed below is inaccurate and must be investigated and removed immediately.

Account Name: [Account Name]
Account Number: [Account Number]
Reason: [Reason]

Under the Fair Credit Reporting Act (FCRA), I request a full investigation and removal of this inaccurate information.

Sincerely,
[Your Name]
`,

    follow_up: `
[Your Name]
[Your Address]
[City, State ZIP]

[Date]

RE: Follow-Up on Previous Investigation Request

To Whom It May Concern,

This letter serves as a follow-up to my previous dispute submitted on [Previous Date]. I have not received a valid response within the required timeframe.

Please complete the investigation and remove the inaccurate information immediately.

Sincerely,
[Your Name]
`,

    final: `
[Your Name]
[Your Address]
[City, State ZIP]

RE: Final Notice Before Escalation

To Whom It May Concern,

This is my final notice regarding the inaccurate information on my credit report. If this matter is not resolved promptly, I will escalate this issue to the appropriate regulatory agencies.

Sincerely,
[Your Name]
`,
}
