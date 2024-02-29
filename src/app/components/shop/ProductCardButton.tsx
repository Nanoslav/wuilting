"use client"

import React, {useEffect} from "react";
import {databases} from "@/app/lib/appwrite";
import {useUserContext} from "@/app/utils/UserContext";
import {UserData} from "@/app/utils/UserData";
import sendToast from "@/app/utils/sendToast";
import Spinner from "@/app/components/Spinner";

export const ProductCardButton = ({id, cost}: {id: string, cost: number}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const {getData, setData} = UserData()

    async function purchaseShopProduct() {
        try {
            const updatedProducts = [...loggedInUser.purchasedProducts, id]

            await databases.updateDocument("wuilting", 'users', loggedInUser.$id, {
                purchasedProducts: updatedProducts
            });

            sendToast("success", "Product purchased successfully")

            await setData("purchasedProducts", updatedProducts)

        } catch (e) {
            console.log(e)
        }
    }

    if(!loggedInUser || loggedInUser === 'pending' || !loggedInUser.purchasedProducts){
        return <Spinner/>
    }

    if (loggedInUser.purchasedProducts.some((product: any) => product.$id === id)){
        return (
            <div className="card-actions justify-end items-center">
                <button className="btn btn-primary" onClick={purchaseShopProduct}>Owned</button>
            </div>
        )
    } else {
        return (
            <div className="card-actions justify-end items-center">
                <div className="badge badge-outline">{cost}€</div>
                <button className="btn btn-primary" onClick={purchaseShopProduct}>Buy Now</button>
            </div>
        )
    }
};