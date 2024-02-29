import React from 'react';
import {NextApiResponse} from "next";
import {client} from "@/app/lib/appwrite-server";
import {client as clientJWT, account as accountJWT, databases} from "@/app/lib/appwrite-jwt";
import {UserDBObject} from "@/app/utils/interfaces/User";
import {ShopProductItem} from "@/app/utils/interfaces/ShopProductItem";


const purchaseShopProduct = async (userId: string, productId: string) => {
    try {
        const userDB: UserDBObject = await databases.getDocument("wuilting", "users", userId)
        const productDB: any = await databases.getDocument("wuilting", "shop_products", productId)

        const userMoney = userDB.money || 0

        if (userMoney < productDB.cost) {
            return 'Not enough money to purchase the product.'
        }

        const purchasedProducts = userDB.purchasedProducts || []
        const updatedProducts = [...purchasedProducts, productId]

        return await databases.updateDocument("wuilting", 'users', userId, {
            purchasedProducts: updatedProducts,
            money: (userMoney - productDB.cost)
        });
    } catch (error) {
        console.error('Error purchasing product:', error);
        throw error;
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const requestResponse = await req.json()
        let {jwt, productId} = requestResponse

        // VERIFY JWT
        clientJWT.setJWT(jwt.jwt);
        const account = await accountJWT.get()
        if(!account || !account.$id) {
            return Response.json({ error: 'Invalid JWT' }, { status: 401 })
        }

        const userId = account.$id

        const result = await purchaseShopProduct(userId, productId)
        if(typeof result === "object"){
            return Response.json(result)
        }

        return Response.json({ error: result }, { status: 418 })


    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}