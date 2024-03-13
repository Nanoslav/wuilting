import {databases} from "@/app/lib/appwrite-server";
import {ID} from "node-appwrite";
import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";
import React from "react";
import ProductCard from "@/app/components/shop/ProductCard";
import {UserMoney} from "@/app/components/UserMoney";

export const metadata = {
    title: 'Shop',
    description: 'Buy unique items with your Wuilting credits.',
}

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

    const products = await getShopProducts() as ShopProductItem[];

    return (
        <main className={'w-full flex justify-center items-center h-9.5/10'} >
            <div className='bg-base-100 rounded-md p-0.5/10 lg:p-0.25/10 z-10 w-8/10 overflow-y-scroll max-h-8/10 flex flex-col'>
                <div className='lg:top-[-2dvw] lg:right-[-2dvw] text-5 sm:text-3 md:text-2 lg:text-1.25'>
                    <UserMoney/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-[2dvw] w-full">
                    {products.map((product: ShopProductItem, index: number) => {
                        return (
                            <div key={index} className="col-span-1 md:col-span-1 lg:col-span-1 w-full">
                                <ProductCard {...product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )

}