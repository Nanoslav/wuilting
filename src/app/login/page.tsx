"use client"

import {Account} from "appwrite";
import {account, client} from "@/app/lib/appwrite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/navigation'
import {useEffect} from "react";
import {useUserContext} from "@/app/utils/UserContext";


export default function Login() {
    const router = useRouter();

    const Login = () => {
        try {
            const response = account.createOAuth2Session(
                "discord",
                process.env.NEXT_PUBLIC_HOSTNAME,
                process.env.NEXT_PUBLIC_HOSTNAME + "/login"
            );
            console.log(response);
        } catch (error) {
            console.error("Failed to create OAuth session:", error);
        }
    };

    // love baby ❤️ <3
    // mas manly socket >3

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="mb-1 text-5xl font-semibold text-center text-purple-700">💫 Wuilting 💫</h1>
                <h2 className="mb-5 font-semibold text-center text-purple-700">Login</h2>
                <button className="btn w-full" type={'button'} onClick={() => Login()}>
                    <FontAwesomeIcon icon={faDiscord}/>
                    Login with Discord
                </button>
            </div>
        </div>
    )

}