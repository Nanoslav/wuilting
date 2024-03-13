"use client"

import React, {useState} from "react";
import {account} from "@/app/lib/appwrite";
import {useUserContext} from "@/app/utils/UserContext";
import {UserData} from "@/app/utils/UserData";
import sendToast from "@/app/utils/sendToast";
import Spinner from "@/app/components/Spinner";
import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";

export const ProductCardButton = ({id, cost}: {id: string, cost: number}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const [loading, setLoading] = useState<boolean>(false);
    const {setData} = UserData()

    async function purchaseShopProduct() {
        try {
            setLoading(true);

            const jwt = await account.createJWT()

            let constructedBody = JSON.stringify({
                "productId": id,
                "jwt": jwt,
            });

            const response = await fetch(`/api/purchaseShopProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: constructedBody
            });

            const responseJson = await response.json()

            if (!response.ok) {
                throw new Error(responseJson.error);
            }

            if(!responseJson || !responseJson?.purchasedProducts || Object.keys(responseJson?.purchasedProducts).length === 0){
                throw new Error('Failed to purchase the product.')
            }
            await setData("purchasedProducts", responseJson?.purchasedProducts)
            console.log(loggedInUser)
            sendToast("success", "Product purchased successfully")
        } catch (err: any) {
            sendToast('error', err.message)
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if(!loggedInUser || loggedInUser === 'pending' || !loggedInUser.purchasedProducts){
        return <Spinner/>
    }

    if (loggedInUser.purchasedProducts.some((product: ShopProductItem) => product.$id === id)){
        return (
            <div className="card-actions justify-end items-center">
                <button className="btn btn-primary" onClick={purchaseShopProduct} title={'Owned'}>Owned</button>
            </div>
        )
    } else {
        return (
            <div className="card-actions justify-end items-center">
                <div className="badge badge-outline">{cost}€</div>
                <button className="btn btn-primary" onClick={purchaseShopProduct} title={'Buy Now'}>Buy Now</button>
            </div>
        )
    }
};