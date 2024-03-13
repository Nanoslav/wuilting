import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";

export interface UserRawObject {
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

export interface UserDBObject {
    name: string;
    avatar: string;
    money: number;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    purchasedProducts: ShopProductItem[];
    $databaseId: string;
    $collectionId: string;
}

export interface UserObject extends UserRawObject, UserDBObject {
}


export interface Users {
    users: UserObject[];
}