"use client"

import {account} from "@/app/lib/appwrite";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Account, Models} from "appwrite";
import Spinner from "@/app/components/Spinner";
import {useUserContext} from "@/app/utils/UserContext";

export default function Logout() {
    const router = useRouter()
    const {setLoggedInUser} = useUserContext();

    const Logout = async () => {
        try {
            await account.deleteSession("current");
        } finally {
            setLoggedInUser(null)
            router.push("/login");
        }
    };

    Logout()

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='flex flex-row gap-4 text-2 items-center justify-center text-center'>
                <Spinner />
                <span>Logging out...</span>
            </div>
        </div>
    )

}