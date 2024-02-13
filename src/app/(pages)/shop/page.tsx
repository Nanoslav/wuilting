import {databases} from "@/app/lib/appwrite";
import {ID} from "appwrite";
import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";

async function getShopProducts() {
    return await databases.listDocuments(
        "wuilting",
        "shop_products"
    );
}

async function createShopProduct({id, title, description, image, date, cost}: ShopProductItem) {
    const promise = await databases.createDocument(
        "wuilting",
        "shop_products",
        ID.unique(),
        { id, title, description, image, date, cost }
    );


}

function Product({product}: any) {
    const {id, title, description, image, date, cost} = product || {};

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">{date ? "NEW": ""}</div>
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
    const products = await getShopProducts();
    console.log(products)

    return <></>
}