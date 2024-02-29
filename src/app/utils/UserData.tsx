import { useState, useEffect } from 'react';
import { useUserContext } from "@/app/utils/UserContext";

export const UserData = () => {
    const { loggedInUser, setLoggedInUser } = useUserContext();
    const [userData, setUserData] = useState(loggedInUser);

    useEffect(() => {
        setUserData(loggedInUser);
    }, [loggedInUser]);

    const get = async (key?: string) => {
        try {
            const newLoggedInUser = userData;
            return key ? newLoggedInUser[key] : newLoggedInUser;
        } catch (e) {
            console.log(e);
        }
    };

    const set = async (key: string, value: unknown) => {
       try {
           let data = await get();

           if (data) {
               data[key] = value;
               setUserData(data);
               setLoggedInUser(data);
           }
       } catch (e) {
           console.log(e)
       }
    };

    return { get, set };
};
