

export interface UserObject {
    ...UserRaw,
    name: string
}

export interface Users {
    users: UserObject[];
}