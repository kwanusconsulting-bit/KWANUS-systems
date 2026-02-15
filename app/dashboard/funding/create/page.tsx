export const dynamic = "force-dynamic";
import { createFunding } from "../actions";
import { redirect } from "next/navigation";

export default function CreateFundingPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-xl px-6 py-10 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Apply for Funding</h1>
                    <a href="/dashboard/funding" className="text-xs text-slate-400 hover:text-white">← Back</a>
                </header>

                <form
                    action={async (formData) => {
                        "use server";
                        await createFunding(formData);
                        redirect("/dashboard/funding");
                    }}
                    className="space-y-4 text-sm"
                >
                    <div className="space-y-1">
                        <label className="text-slate-300">Product Type</label>
                        <select
                            name="productType"
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        >
                            <option value="CREDIT_CARD">Credit Card</option>
                            <option value="LINE_OF_CREDIT">Line of Credit</option>
                            <option value="TERM_LOAN">Term Loan</option>
                            <option value="GRANT">Grant</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Amount Requested</label>
                        <input
                            name="amountRequested"
                            type="number"
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Notes (optional)</label>
                        <textarea
                            name="notes"
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 h-24 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Emotional Tone (optional)</label>
                        <input
                            name="emotionalTone"
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-slate-100 text-slate-900 px-4 py-2 font-medium hover:bg-white transition"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </main>
    );
}
