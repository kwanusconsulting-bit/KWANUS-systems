import { Permissions } from "./permissions";

export const Roles = {
    USER: {
        name: "User",
        permissions: [
            Permissions.VIEW_CREDIT,
            Permissions.VIEW_EMOTIONS,
            Permissions.RECORD_EMOTION,
            Permissions.VIEW_JOURNEYS,
            Permissions.CREATE_JOURNEY
        ]
    },
    ADMIN: {
        name: "Admin",
        permissions: Object.values(Permissions)
    }
} as const;

export type RoleKey = keyof typeof Roles;

export function getRolePermissions(role: RoleKey) {
    return Roles[role].permissions;
}
