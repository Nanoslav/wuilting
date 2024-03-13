import {UserDBObject} from "@/app/utils/interfaces/User";

export default interface WuiltingObject {
    word: string;
    words?: number | null;
    date?: Date | null;
    author: UserDBObject;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}