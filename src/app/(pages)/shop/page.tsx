import {databases} from "@/app/lib/appwrite-server";
import {ID} from "node-appwrite";
import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";
import React from "react";
import ProductCard from "@/app/components/shop/ProductCard";

export default async function ShopPage() {


    async function getShopProducts() {
        return (await databases.listDocuments(
            "wuilting",
            "shop_products"
        )).documents;
    }

    async function createShopProduct({title, description, image, is_new, cost}: ShopProductItem) {
        return await databases.createDocument(
            "wuilting",
            "shop_products",
            ID.unique(),
            {title, description, image, is_new, cost}
        );
    }

    /*await createShopProduct({
        title: "Opica",
        description: "monkey",
        image: new URL("https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"),
        is_new: true,
        cost: 500
    })*/

    const products: any = await getShopProducts();

    return (
        <main className='w-full h-full flex justify-center items-center'>
            <div className='bg-base-100 rounded-md grid grid-cols-3 grid-flow-row gap-4 p-0.25/10 z-10 w-8/10 overflow-y-scroll max-h-8/10'>
                {products.map((product: ShopProductItem, index: number) => {
                    return (
                        <div key={index} className="col-span-1 md:col-span-1 lg:col-span-1">
                            <ProductCard {...product} />
                        </div>
                    )
                })}
            </div>
        </main>
    )

}