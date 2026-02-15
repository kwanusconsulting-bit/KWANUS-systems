"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function NavItem({
    href,
    label
}: {
    href: string;
    label: string;
}) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "block px-4 py-2 rounded-lg text-sm transition",
                active
                    ? "bg-accent-primary text-white"
                    : "text-white/70 hover:bg-white/10"
            )}
        >
            {label}
        </Link>
    );
}
