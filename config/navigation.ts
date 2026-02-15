export const navigationConfig = {
    domains: [
        {
            id: "foundation",
            title: "Foundation",
            path: "/dashboard",
            icon: "◈",
            subsections: [
                { title: "Profile", path: "/profile" },
                { title: "Settings", path: "/settings" },
                { title: "Vault", path: "/vault" }
            ]
        },
        {
            id: "emotions",
            title: "Emotional Engine",
            path: "/emotions",
            icon: "◎",
            subsections: [
                { title: "Pulse", path: "/emotions/pulse" },
                { title: "History", path: "/emotions/history" }
            ]
        },
        {
            id: "hybrid",
            title: "Hybrid Strategy",
            path: "/hybrid",
            icon: "✦",
            subsections: [
                { title: "Credit-Emoto", path: "/hybrid/map" },
                { title: "Insights", path: "/hybrid/insights" }
            ]
        },
        {
            id: "partners",
            title: "Partner Universe",
            path: "/partners",
            icon: "✧",
            subsections: [
                { title: "Registry", path: "/partners/registry" },
                { title: "Interactions", path: "/partners/interactions" }
            ]
        },
        {
            id: "productivity",
            title: "Productivity",
            path: "/projects",
            icon: "◬",
            subsections: [
                { title: "Projects", path: "/projects" },
                { title: "Tasks", path: "/tasks" },
                { title: "Calendar", path: "/calendar" }
            ]
        },
        {
            id: "communication",
            title: "Communication",
            path: "/messages",
            icon: "❃",
            subsections: [
                { title: "Threads", path: "/messages" },
                { title: "Announcements", path: "/announcements" },
                { title: "Support", path: "/support" }
            ]
        },
        {
            id: "wellbeing",
            title: "Well-being",
            path: "/wellbeing",
            icon: "⚛",
            subsections: [
                { title: "Check-in", path: "/checkin" },
                { title: "Grounding", path: "/grounding" },
                { title: "Energy", path: "/energy" }
            ]
        },
        {
            id: "admin",
            title: "Admin",
            path: "/admin",
            icon: "🛡",
            subsections: [
                { title: "System", path: "/system" },
                { title: "Analytics", path: "/analytics" }
            ]
        }
    ]
};
