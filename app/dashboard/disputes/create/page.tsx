export const dynamic = "force-dynamic";
import { createDispute } from "../actions";

export default function CreateDisputePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-xl px-6 py-10 space-y-6">
                <h1 className="text-xl font-semibold tracking-tight">Create Dispute</h1>

                <form action={createDispute} className="space-y-4 text-sm">
                    <div className="space-y-1">
                        <label className="text-slate-300">Bureau</label>
                        <select
                            name="bureau"
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2"
                        >
                            <option value="EXPERIAN">Experian</option>
                            <option value="EQUIFAX">Equifax</option>
                            <option value="TRANSUNION">TransUnion</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Creditor</label>
                        <input
                            name="creditor"
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Account Number</label>
                        <input
                            name="accountNumber"
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Reason</label>
                        <textarea
                            name="reason"
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 h-24"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Emotional Tone (optional)</label>
                        <input
                            name="emotionalTone"
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-md bg-slate-100 text-slate-900 px-4 py-2 font-medium hover:bg-white transition"
                    >
                        Create Dispute
                    </button>
                </form>
            </div>
        </main>
    );
}
