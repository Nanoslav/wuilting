"use client"

import {Account} from "appwrite";
import {account, client} from "@/app/lib/appwrite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/navigation'
import {useEffect} from "react";
import {useUserContext} from "@/app/utils/UserContext";


export default function Login() {
    const router = useRouter();

    const Login = (provider: string) => {
        try {
            const response = account.createOAuth2Session(
                provider,
                process.env.NEXT_PUBLIC_HOSTNAME,
                process.env.NEXT_PUBLIC_HOSTNAME + "/login"
            );
        } catch (error) {
            console.error("Failed to create OAuth session:", error);
        }
    };

    // love baby ❤️ <3
    // mas manly socket >3

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-lg bg-base-100">
                <h1 className="mb-1 text-5xl font-semibold text-center text-teal-300">💫 Wuilting 💫</h1>
                <h2 className="mb-5 font-semibold text-center text-purple-700 text-gray-300">Login</h2>
                <div className='flex flex-col gap-[1dvw]'>
                    <button title='Login with Discord' className="btn w-full" type={'button'}
                            onClick={() => Login('discord')}>
                        <FontAwesomeIcon icon={faDiscord}/> Login with Discord
                    </button>
                    <button title='Login with Google' className="btn w-full" type={'button'}
                            onClick={() => Login('google')}>
                        <FontAwesomeIcon icon={faGoogle}/> Login with Google
                    </button>
                    {/*<button title='Login with Github' className="btn w-full" type={'button'} onClick={() => Login('github')}>*/}
                    {/*    <FontAwesomeIcon icon={faGithub}/> Login with Github*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    )

}