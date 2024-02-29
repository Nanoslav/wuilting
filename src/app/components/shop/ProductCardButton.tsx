"use client"

import React from "react";
import {databases} from "@/app/lib/appwrite";
import {useUserContext} from "@/app/utils/UserContext";
import {UserData} from "@/app/utils/UserData";

export const ProductCardButton = ({id, cost}: {id: string, cost: number}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const {get, set} = UserData()

    async function purchaseShopProduct() {
        try {

            const updatedProducts = {
                ...loggedInUser.purchasedProducts, id
            }

            const result = await databases.updateDocument("wuilting", 'users', loggedInUser.$id, {
                purchasedProducts: updatedProducts
            });

            //const newLoggedInUser = loggedInUser;
            //newLoggedInUser.purchasedProducts = updatedProducts;
            //setLoggedInUser(newLoggedInUser);

            await set("purchasedProducts", updatedProducts)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="card-actions justify-end items-center">
            <div className="badge badge-outline">{cost}€</div>
            <button className="btn btn-primary" onClick={purchaseShopProduct}>Buy Now</button>
        </div>
    );
};