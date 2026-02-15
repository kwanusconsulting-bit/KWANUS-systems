export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function CreditItemsPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const items = await prisma.creditItem.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">Credit Items</h1>
                <a
                    href="/dashboard/credit-items/create"
                    className="text-xs text-slate-300 underline hover:text-white"
                >
                    + Add Item
                </a>
            </div>

            <div className="space-y-3 text-sm">
                {items.length === 0 && (
                    <p className="text-slate-500">No credit items yet.</p>
                )}

                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`/dashboard/credit-items/${item.id}`}
                        className="block rounded-md border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600 transition"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">{item.creditorName}</p>
                                <p className="text-xs text-slate-400">
                                    {item.accountNumber} • {item.status}
                                </p>
                            </div>
                            {item.balance !== null && (
                                <p className="text-xs font-mono">${item.balance.toLocaleString()}</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
