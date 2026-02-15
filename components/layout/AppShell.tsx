"use client";

import OSDesktopShell from "../os/OSDesktopShell";
import OSMobileShell from "../os/mobile/OSMobileShell";
import { useDevice } from "@/providers/DeviceProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { isMobile }: any = useDevice();

    if (isMobile) {
        return <OSMobileShell>{children}</OSMobileShell>;
    }

    return <OSDesktopShell>{children}</OSDesktopShell>;
}
