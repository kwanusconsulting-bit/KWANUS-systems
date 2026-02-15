import React from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Check-In', href: '/check-in' },
    { label: 'Timeline', href: '/emotions' },
    { label: 'Hybrid', href: '/hybrid' },
    { label: 'Credit', href: '/credit-items' },
    { label: 'Partners', href: '/partners' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Messages', href: '/messages' },
    { label: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-black border-r border-white/5 p-6 flex flex-col fixed left-0 top-0">
            <div className="mb-12 px-2">
                <h2 className="text-2xl font-black italic tracking-tighter">KWANUS</h2>
            </div>

            <nav className="flex-1 space-y-1">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all text-xs uppercase tracking-widest font-black"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">State</div>
                <div className="text-[10px] uppercase tracking-widest text-emerald-500 font-black">Thriving</div>
            </div>
        </aside>
    );
};
