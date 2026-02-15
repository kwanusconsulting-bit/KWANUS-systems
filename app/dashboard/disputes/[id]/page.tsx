export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateDispute, deleteDispute } from "../actions";
import { redirect } from "next/navigation";

export default async function EditDisputePage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const dispute = await prisma.dispute.findUnique({
        where: { id }
    });

    if (!dispute) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-50 p-10">
                <p>Dispute not found.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-xl px-6 py-10 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Edit Dispute</h1>
                    <a href="/dashboard/disputes" className="text-xs text-slate-400 hover:text-white">← Back</a>
                </header>

                <form
                    action={async (formData) => {
                        "use server";
                        await updateDispute(dispute.id, formData);
                        redirect("/dashboard/disputes");
                    }}
                    className="space-y-4 text-sm"
                >
                    <div className="space-y-1">
                        <label className="text-slate-300">Bureau</label>
                        <select
                            name="bureau"
                            defaultValue={dispute.bureau}
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
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
                            name="creditorName"
                            defaultValue={dispute.creditorName ?? undefined}
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Account Number</label>
                        <input
                            name="accountNumber"
                            defaultValue={dispute.accountNumber ?? undefined}
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Reason</label>
                        <textarea
                            name="reason"
                            defaultValue={dispute.reason}
                            required
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 h-24 text-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Status</label>
                        <select
                            name="status"
                            defaultValue={dispute.status}
                            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-300">Emotional Tone</label>
                        <input
                            name="emotionalTone"
                            defaultValue={dispute.emotionalTone || ""}
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
                        await deleteDispute(dispute.id);
                        redirect("/dashboard/disputes");
                    }}
                    className="pt-2"
                >
                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-600/20 border border-red-900 text-red-400 px-4 py-2 text-sm hover:bg-red-600 hover:text-white transition"
                    >
                        Delete Dispute
                    </button>
                </form>
            </div>
        </main>
    );
}
