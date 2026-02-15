export default function StatCard({
    title,
    value,
    accent = "text-white"
}: {
    title: string;
    value: number | string;
    accent?: string;
}) {
    return (
        <div className="rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition-all duration-300">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">{title}</p>
            <p className={`text-2xl font-semibold mt-1 ${accent}`}>
                {value}
            </p>
        </div>
    );
}
