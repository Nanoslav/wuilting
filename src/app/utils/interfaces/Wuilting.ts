import {UserDBObject} from "@/app/utils/interfaces/User";

export default interface WuiltingObject {
    word: string;
    words?: number | null;
    date?: Date | null;
    $id: string;
    $createdAt: Date;
    $updatedAt: Date;
    $permissions: string[];
    author: UserDBObject;
    $databaseId: string;
    $collectionId: string;
}