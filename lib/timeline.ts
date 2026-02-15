// lib/timeline.ts

export type TimelineEventType =
    | "emotionalUpdate"
    | "disputeCreated"
    | "disputeUpdated"
    | "fundingSubmitted"
    | "fundingUpdated"
    | "creditChange"
    | "note";

export interface TimelineEvent {
    type: TimelineEventType;
    timestamp: Date;
    emotionalState?: string;
    description: string;
    meta?: Record<string, any>;
}

export function formatTimeline(events: TimelineEvent[]) {
    return events
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .map((event) => {
            const timeAgo = getTimeAgo(event.timestamp);

            let label = "";
            switch (event.type) {
                case "emotionalUpdate":
                    label = `Emotional state updated to ${event.emotionalState}`;
                    break;
                case "disputeCreated":
                    label = `Dispute created for ${event.meta?.creditor}`;
                    break;
                case "disputeUpdated":
                    label = `Dispute updated: ${event.meta?.status}`;
                    break;
                case "fundingSubmitted":
                    label = `Funding application submitted to ${event.meta?.lender}`;
                    break;
                case "fundingUpdated":
                    label = `Funding status: ${event.meta?.status}`;
                    break;
                case "creditChange":
                    label = `Credit item updated: ${event.meta?.item}`;
                    break;
                case "note":
                    label = event.description;
                    break;
            }

            return {
                timeAgo,
                label,
                description: event.description,
            };
        });
}

function getTimeAgo(date: Date) {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}
