export const dynamic = "force-dynamic";
import { createCreditItem } from "../actions";

export default function CreateCreditItemPage() {
    return (
        <div className="space-y-6 max-w-xl">
            <h1 className="text-xl font-semibold tracking-tight">Add Credit Item</h1>

            <form action={createCreditItem} className="space-y-4 text-sm">
                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Creditor</label>
                    <input
                        name="creditor"
                        required
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Account Number</label>
                    <input
                        name="accountNumber"
                        required
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Balance (optional)</label>
                    <input
                        name="balance"
                        type="number"
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Status</label>
                    <select
                        name="status"
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    >
                        <option value="OPEN">Open</option>
                        <option value="CLOSED">Closed</option>
                        <option value="CHARGED_OFF">Charged Off</option>
                        <option value="COLLECTION">Collection</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Emotional Tone (optional)</label>
                    <input
                        name="emotionalTone"
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-slate-100 text-slate-900 px-4 py-2 font-medium hover:bg-white transition"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}
