
export async function triggerPayment(action: string) {
    console.log("Payment triggered for:", action)

    // Replace this with Stripe, Square, or PayPal later
    return {
        status: "pending",
        message: `Payment required for: ${action}`,
    }
}
