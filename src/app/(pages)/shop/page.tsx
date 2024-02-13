import {databases} from "@/app/lib/appwrite";
import {ID} from "appwrite";
import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";
import {URLPattern} from "next/server";
import React from "react";
import {forEachEntryModule} from "next/dist/build/webpack/utils";

async function getShopProducts() {
    const res = await databases.listDocuments(
        "wuilting",
        "shop_products"
    );
    return res.documents;
}

async function createShopProduct({title, description, image, is_new, cost}: ShopProductItem) {
    return await databases.createDocument(
        "wuilting",
        "shop_products",
        ID.unique(),
        {title, description, image, is_new, cost}
    );
}

function Product({title, description, image, is_new, cost}: ShopProductItem) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={image.toString()} alt={title}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    {is_new ? <div className="badge badge-secondary">NEW</div>: null}
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{cost}</div>
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default async function ShopPage() {
    /*await createShopProduct({
        title: "Opica",
        description: "monkey",
        image: new URL("https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"),
        is_new: true,
        cost: 500
    })*/
    const products: any = await getShopProducts();

    return (
        <div>
            {products.map((product: ShopProductItem, index: number) => {
                return <Product {...product} key={index} />
            })}
        </div>
    )

}