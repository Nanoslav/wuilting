"use client"

import React, {useEffect} from 'react';
import {useUserContext} from "@/app/utils/UserContext";
import {account} from "@/app/lib/appwrite";

const AuthHandler = () => {

    const { setLoggedInUser} = useUserContext();

    const fetchUser = async () => {
        try {
            const data: any = await account.get();
            setLoggedInUser(data);
        } catch (error) {
            setLoggedInUser(null);
            console.info("AUTH HANDLER: NOT LOGGED IN.")
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