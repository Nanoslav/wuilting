export interface UserObject {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    registration: string;
    status: boolean;
    labels: string[];
    passwordUpdate: string;
    email: string;
    phone: string;
    emailVerification: boolean;
    phoneVerification: boolean;
    prefs: Record<string, unknown>;
    accessedAt: string;
}

export interface Users {
    users: UserObject[];
}