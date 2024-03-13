"use client"

import React, {useEffect} from 'react';
import {useUserContext} from "@/app/utils/UserContext";
import {account} from "@/app/lib/appwrite";
import {UserObject, UserRawObject} from "@/app/utils/interfaces/User";

const AuthHandler = () => {

    const { setLoggedInUser} = useUserContext();

    const fetchUser = async () => {
        try {
            const rawData: UserRawObject = await account.get();
            const data: UserObject = {...rawData} as UserObject;
            data.avatar = '';
            data.money = 0;
            data.purchasedProducts = [];
            data.$permissions = [];
            setLoggedInUser(data);
        } catch (error) {
            setLoggedInUser(null);
            console.info("AUTH HANDLER: NOT LOGGED IN.");
            // if (pathname !== '/login') {
            //     console.info("AUTH HANDLER: REDIRECTING TO LOGIN.")
            //     router.push('/login');
            // }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <></>
    )
};

export default AuthHandler;