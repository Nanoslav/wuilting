"use client"

import {useUserContext} from "@/app/utils/UserContext";

export const UserMoney = () => {

    const { loggedInUser } = useUserContext();

    if(!loggedInUser || loggedInUser === "pending") {
        return ""
    }

    return (
        <>
            {loggedInUser.money} 🪙
        </>
    );
};