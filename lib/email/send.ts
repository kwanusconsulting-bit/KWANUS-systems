// lib/email/send.ts

export async function sendEmail({
    to,
    subject,
    body,
}: {
    to: string
    subject: string
    body: string
}) {
    console.log("Email queued:", { to, subject, body })

    // Replace with SendGrid, Resend, Postmark, or Supabase Email later
    return { status: "queued" }
}
