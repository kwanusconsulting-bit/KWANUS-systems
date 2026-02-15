export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateFunding, deleteFunding } from "../actions";
import { redirect } from "next/navigation";

export default async function EditFundingPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const app = await prisma.fundingApplication.findUnique({
        where: { id }
    });

    if (!app) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-50 p-10">
                <p>Funding application not found.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-xl px-6 py-10 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Edit Funding Application</h1>
                    <a href="/dashboard/funding" className="text-xs text-slate-400 hover:text-white">← Back</a>
                </header>

                <form
                    action={async (formData) => {
                        "use server";
                        await updateFunding(app.id, formData);
                        redirect("/dashboard/funding");
                    }}
                    className="space-y-4 text-sm"
                >
                    <div className="space-y-1">
                        <label className="text-slate-300">Product Type</label>
                        <select
                            name="productType"
                            defaultValue={app.productType}
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
                            name="requestedAmount"
                            type="number"
                            defaultValue={app.requestedAmount ?? undefined}
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Status</label>
                        <select
                            name="status"
                            defaultValue={app.status}
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="DECLINED">Declined</option>
                            <option value="WITHDRAWN">Withdrawn</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Notes</label>
                        <textarea
                            name="notes"
                            defaultValue={app.notes || ""}
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 h-24 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Emotional Tone</label>
                        <input
                            name="emotionalTone"
                            defaultValue={app.emotionalTone || ""}
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-slate-100 text-slate-900 px-4 py-2 font-medium hover:bg-white transition"
                    >
                        Save Changes
                    </button>
                </form>

                <form
                    action={async () => {
                        "use server";
                        await deleteFunding(app.id);
                        redirect("/dashboard/funding");
                    }}
                    className="pt-2"
                >
                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-600/20 border border-red-900 text-red-400 px-4 py-2 text-sm hover:bg-red-600 hover:text-white transition"
                    >
                        Delete Application
                    </button>
                </form>
            </div>
        </main>
    );
}
