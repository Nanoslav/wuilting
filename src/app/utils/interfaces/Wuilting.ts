import {UserDBObject} from "@/app/utils/interfaces/User";

export default interface WuiltingObject {
    word: string;
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    author: UserDBObject;
    $databaseId: string;
    $collectionId: string;
}