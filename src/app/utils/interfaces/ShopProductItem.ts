export interface ShopProductItem {
    title: string,
    description: string,
    image: URL,
    is_new: boolean,
    cost: number,
    $id: string,
    $createdAt: Date;
    $updatedAt: Date;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}