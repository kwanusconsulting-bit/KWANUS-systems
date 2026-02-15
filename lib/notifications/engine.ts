import { emotionalEngine } from '../emotion/engine';

/**
 * KWANUS Notification Engine
 * Managing the rhythmic delivery of system signals.
 */

export class NotificationEngine {
    private notifications: any[] = [];

    push(notification: any) {
        const pacing = emotionalEngine.getState().mode === 'worst' ? 'gentle' : 'active';
        console.log(`[NOTIFICATIONS] Pushing with ${pacing} pacing: ${notification.title}`);
        this.notifications.push({ ...notification, pacing });
    }

    getHistory() {
        return this.notifications;
    }
}

export const notificationEngine = new NotificationEngine();
