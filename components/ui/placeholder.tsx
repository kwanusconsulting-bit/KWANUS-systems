export function Placeholder({ label }: { label: string }) {
    return (
        <div className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-xs text-white/60">
            {label}
        </div>
    );
}
