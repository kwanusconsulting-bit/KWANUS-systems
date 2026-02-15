// lib/notifications.ts

export type NotificationType =
    | "emotional-update"
    | "dispute-update"
    | "funding-update"
    | "credit-item-update"
    | "system-guidance"
    | "milestone";

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
}
