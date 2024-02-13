"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import login from '@/app/utils/login';
import {UserObject} from "@/app/utils/interfaces/User";

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

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
