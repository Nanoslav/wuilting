"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface UserContextProps {
    children: ReactNode;
}

interface UserContextValue {
    loggedInUser: any;
    setLoggedInUser: React.Dispatch<React.SetStateAction<any>>;
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

    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </UserContext.Provider>
    );
};

