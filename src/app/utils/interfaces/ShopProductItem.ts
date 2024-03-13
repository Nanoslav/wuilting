export interface ShopProductItem {
    title: string,
    description: string,
    image: URL,
    is_new: boolean,
    cost: number,
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}