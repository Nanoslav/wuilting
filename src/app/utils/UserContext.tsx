"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import {UserDBObject, UserObject} from "@/app/utils/interfaces/User";
import {account, client, database} from "@/app/lib/appwrite";

interface UserContextProps {
    children: ReactNode;
}

interface UserContextValue {
    loggedInUser: any;
    setLoggedInUser: React.Dispatch<React.SetStateAction<UserObject | null | "pending">>;
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
    const [loggedInUser, setLoggedInUser] = useState<UserObject | null | "pending">("pending");

    const addUserDBData = async (retryCount =  0) => {
        if (!loggedInUser || loggedInUser === "pending" || !loggedInUser.$id || loggedInUser.purchasedProducts) {
            return;
        }

        try {
            const response = await fetch(`/api/getUser/${loggedInUser.$id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data: UserDBObject = await response.json();

            const newLoggedInUser: any = {...loggedInUser};
            newLoggedInUser.avatar = data.avatar;
            newLoggedInUser.money = data.money;
            newLoggedInUser.purchasedProducts = data.purchasedProducts;
            console.info("USER CONTEXT: Fetched user data:", newLoggedInUser);
            setLoggedInUser(newLoggedInUser);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (retryCount <  2) {
                setTimeout(() => {
                    addUserDBData(retryCount++);
                },  2000);
            } else {
                setLoggedInUser(null);
            }
        }
    };

    const updateUser = async (res: UserDBObject) => {
        const authAccount = await account.get()
        setLoggedInUser({...authAccount, ...res});
    }

    useEffect(() => {
        try {
            addUserDBData()
        } catch (error) {
            console.error('Error fetching user data:', error)
        }

        const unsubscribe = client.subscribe(`databases.${database}.collections.users.documents`, response => {
            const res: any = response.payload;
            if (loggedInUser !== "pending" && loggedInUser && loggedInUser.$id && res.$id === loggedInUser.$id) {
                updateUser(res);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [loggedInUser]);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
