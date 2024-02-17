"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import login from '@/app/utils/login';
import {UserRaw} from "@/app/utils/interfaces/UserRaw";
import {Models} from "appwrite";
import {UserObject} from "@/app/utils/interfaces/User";

interface UserContextProps {
    children: ReactNode;
}

interface UserContextValue {
    loggedInUser: any;
    setLoggedInUser: React.Dispatch<React.SetStateAction<UserRaw | null | "pending">>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [loggedInUser, setLoggedInUser] = useState<any | null | "pending">("pending");

    const addUserDBData = async () => {
        if(!loggedInUser || loggedInUser === "pending" || !loggedInUser.$id) {
            return
        }

        console.log("LOGGED IN USER RAW:", loggedInUser)

        const response = await fetch(`/api/getUser/${loggedInUser.$id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data: any = await response.json()

        console.log("LOGGED IN USER DB:", data.user)

        const newLoggedInUser = loggedInUser
        newLoggedInUser.avatar = data.user.avatar
        newLoggedInUser.purchasedProducts = data.user.purchasedProducts
        setLoggedInUser(newLoggedInUser)

        console.log("FINISHED LOGGED IN USER:", loggedInUser)
    }

    useEffect(() => {
        try {
            addUserDBData()
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }, [loggedInUser]);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
