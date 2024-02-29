"use client"

import React, {useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {useUserContext} from "@/app/utils/UserContext";
import {account} from "@/app/lib/appwrite";

const AuthHandler = () => {

    const pathname = usePathname();
    const router = useRouter();

    const { setLoggedInUser, loggedInUser } = useUserContext();

    const fetchUser = async () => {
        try {
            const data: any = await account.get();
            setLoggedInUser(data);
        } catch (error) {
            setLoggedInUser(null);
            console.info("AUTH HANDLER: NOT LOGGED IN.")
            if (pathname !== '/login') {
                console.info("AUTH HANDLER: REDIRECTING TO LOGIN.")
                router.push('/login');
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const Login = () => {
        try {
            const response = account.createOAuth2Session(
                "discord",
                process.env.NEXT_PUBLIC_HOSTNAME,
                process.env.NEXT_PUBLIC_HOSTNAME + "/login"
            );
        } catch (error) {
            console.error("Failed to create OAuth session:", error);
        }
    };

    return (
        <></>
    )
};

export default AuthHandler;