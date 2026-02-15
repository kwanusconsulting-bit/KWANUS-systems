export type NotificationType = 'system' | 'emotional' | 'hybrid' | 'partner';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface KwanusNotification {
    id: string;
    type: NotificationType;
    priority: NotificationPriority;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}
