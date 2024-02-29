"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import {UserDBObject, UserObject} from "@/app/utils/interfaces/User";

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
        if (!loggedInUser || loggedInUser === "pending" || !loggedInUser.$id) {
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

            const newLoggedInUser: any = loggedInUser;
            newLoggedInUser.avatar = data.avatar;
            newLoggedInUser.money = data.money;
            // TODO: add more fields here
            newLoggedInUser.purchasedProducts = data.purchasedProducts;
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
