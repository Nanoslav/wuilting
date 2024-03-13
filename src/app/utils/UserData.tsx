import { useUserContext } from "@/app/utils/UserContext";
import {UserObject} from "@/app/utils/interfaces/User";

export const UserData = () => {
    const { loggedInUser, setLoggedInUser } = useUserContext();

    const setData = async <T extends keyof UserObject>(key: T, value: UserObject[T]) => {
        try {
            if (!loggedInUser || loggedInUser === "pending" || !loggedInUser.$id) return;
            let data: UserObject = { ...loggedInUser };
            data[key] = value;
            setLoggedInUser(data);
        } catch (e) {
            console.log(e);
        }
    };

    return { setData };
};
