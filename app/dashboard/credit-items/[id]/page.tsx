export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateCreditItem, deleteCreditItem } from "../actions";
import { auth } from "@clerk/nextjs/server";

export default async function EditCreditItemPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { userId } = await auth();
    const { id } = await params;

    const item = await prisma.creditItem.findFirst({
        where: { id, userId: userId || "" }
    });

    if (!item) {
        return (
            <div className="p-10">
                <p>Credit item not found.</p>
            </div>
        );
    }

    const disputes = await prisma.dispute.findMany({
        where: { creditItemId: item.id, userId: userId || "" },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-8 max-w-xl text-sm">
            <h1 className="text-xl font-semibold tracking-tight">Edit Credit Item</h1>

            <form
                action={async (formData) => {
                    "use server";
                    await updateCreditItem(item.id, formData);
                }}
                className="space-y-4 text-sm"
            >
                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Creditor</label>
                    <input
                        name="creditorName"
                        defaultValue={item.creditorName ?? undefined}
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Account Number</label>
                    <input
                        name="accountNumber"
                        defaultValue={item.accountNumber ?? undefined}
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Balance</label>
                    <input
                        name="balance"
                        type="number"
                        defaultValue={item.balance || ""}
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Status</label>
                    <select
                        name="status"
                        defaultValue={item.status}
                        className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                    >
                        <option value="OPEN">Open</option>
                        <option value="CLOSED">Closed</option>
                        <option value="CHARGED_OFF">Charged Off</option>
                        <option value="COLLECTION">Collection</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-slate-300 text-xs uppercase tracking-wider">Emotional Tone</label>
                    <input
                        name="emotionalTone"
                        defaultValue={item.emotionalTone || ""}
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

            <div className="space-y-3 pt-6 border-t border-white/10">
                <h2 className="text-sm font-medium">Linked Disputes</h2>
                {disputes.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No disputes linked to this item.</p>
                ) : (
                    <div className="space-y-2">
                        {disputes.map((d) => (
                            <a
                                key={d.id}
                                href={`/dashboard/disputes/${d.id}`}
                                className="block rounded-md border border-slate-800 bg-slate-900/40 p-3 text-xs hover:border-slate-600 transition"
                            >
                                <div className="flex justify-between">
                                    <span>{d.reason}</span>
                                    <span className="text-slate-400">{d.status}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-8 border-t border-white/10">
                <form
                    action={async () => {
                        "use server";
                        await deleteCreditItem(item.id);
                    }}
                >
                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-600/20 border border-red-900 text-red-400 px-4 py-2 text-sm hover:bg-red-600 hover:text-white transition"
                    >
                        Delete Credit Item
                    </button>
                </form>
            </div>
        </div>
    );
}
