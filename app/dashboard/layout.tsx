import AppShell from "@/components/layout/AppShell";
import { UserInitializer } from "@/components/UserInitializer";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <AppShell>
            <UserInitializer />
            {children}
        </AppShell>
    );
}
