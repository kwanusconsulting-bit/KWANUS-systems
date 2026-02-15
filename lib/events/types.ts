export type EventDomain =
    | 'emotional'
    | 'hybrid'
    | 'partner'
    | 'productivity'
    | 'communication'
    | 'system';

export type EventType =
    | 'CHECK_IN'
    | 'INTENSITY_SHIFT'
    | 'HYBRID_UPDATE'
    | 'THRESHOLD_CROSSED'
    | 'PARTNER_SYNC'
    | 'TASK_COMPLETE'
    | 'NEW_MESSAGE'
    | 'SYSTEM_HEALTH_ALERT'
    | 'PULSE_UPDATE';

export interface KwanusEvent<T = any> {
    id: string;
    type: EventType;
    domain: EventDomain;
    userId: string;
    payload: T;
    createdAt: string;
}

export type NotificationLayer = 1 | 2 | 3 | 4; // Silent, Passive, Active, Priority
