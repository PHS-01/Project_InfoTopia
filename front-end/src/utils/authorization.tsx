import { RoleType, UserType } from "../api/responses"

export function can(roles: Array<RoleType>, targetRoles: Array<string>): boolean {
    for (let i = 0; i < roles.length; i++) {
        for (let j = 0; j < targetRoles.length; j++) {
            if (roles[i].name == targetRoles[j]) return true;
        }
    }
    return false
}

export function isLeader(user: UserType, classeId: number): boolean {
    for (let i = 0; i < user.classes.length; i++) {
        if (user.classes[i].id == classeId) return true;
    }
    return false
}