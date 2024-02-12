import Cookies from "js-cookie";
import {account} from "@/app/lib/appwrite";

const login = async (email: string | undefined, password: string | undefined) => {

    let authAccount: any

    try {
        authAccount = await account.get()
    } catch (e) {
        if(email && password){
            await account.createEmailSession(email, password)
            authAccount = await account.get()
            Cookies.set("email", email, { expires: 7 })
            Cookies.set("password", password, { expires: 7 })
        } else {
            return null
        }

    }



    return authAccount

};

export default login;