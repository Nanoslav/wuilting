import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";
import {databases} from "@/app/lib/appwrite";
import {ID} from "appwrite";
import React from "react";
import {ProductCardButton} from "@/app/components/shop/ProductCardButton";

export default function ProductCard({title, description, image, is_new, cost, $id}: ShopProductItem) {
    return (
        <div className="card w-96 bg-base-200 shadow-2xl">
            <figure>
                <img src={image.toString()} alt={title} className='h-[10dvw] w-full' />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    {is_new ? <div className="badge badge-secondary">NEW</div>: null}
                </h2>
                <p>{description}</p>
                <ProductCardButton id={$id} cost={cost} />
            </div>
        </div>
    );
}