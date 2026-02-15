export const Permissions = {
    VIEW_CREDIT: "view_credit",
    EDIT_CREDIT: "edit_credit",
    VIEW_EMOTIONS: "view_emotions",
    RECORD_EMOTION: "record_emotion",
    VIEW_JOURNEYS: "view_journeys",
    CREATE_JOURNEY: "create_journey",
    VIEW_AUDIT: "view_audit",
    VIEW_SYSTEM_HEALTH: "view_system_health"
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
