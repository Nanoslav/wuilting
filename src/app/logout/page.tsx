"use client"

import {account} from "@/app/lib/appwrite";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Account, Models} from "appwrite";

export default function Logout() {
    const router = useRouter()

    const Logout = async () => {
        try {
            await account.deleteSession("current");
            router.push("/login");
        } catch (error) {
            console.log("the error that happened:", error);
        }
    };

    Logout()

    // const promise = account.deleteSession();
    //
    // promise.then(function (response) {
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });

}