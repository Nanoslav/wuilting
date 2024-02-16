import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";
import {databases} from "@/app/lib/appwrite";
import {ID} from "appwrite";
import React from "react";

export default function ProductCard({title, description, image, is_new, cost}: ShopProductItem) {
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
                <div className="card-actions justify-end items-center">
                    <div className="badge badge-outline">{cost}€</div>
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}