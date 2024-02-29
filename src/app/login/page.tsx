"use client"

import {account, client} from "@/app/lib/appwrite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons'

// export const metadata = {
//     title: 'Log in',
// }

export default function Login() {

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
            <div className="p-0.5/10 lg:p-0.25/10 m-auto rounded-md shadow-md w-9/10 md:w-6/10 lg:w-4/10 bg-base-100">
                {/*<h2 className="mb-1 text-2xl lg:text-2 font-semibold text-center text-teal-300">💫 Wuilting 💫</h2>*/}
                <h1 className="mb-5 font-semibold text-center text-10 sm:text-7.5 md:text-5 lg:text-3">Login</h1>
                <div className='flex flex-col gap-[1dvw]'>
                    <button title='Login with Discord' className="btn w-full h-[5dvw] md:h-[4dvw] lg:h-[3dvw] lg:text-1" type={'button'}
                            onClick={() => Login('discord')}>
                        <FontAwesomeIcon icon={faDiscord}/> Login with Discord
                    </button>
                    <button title='Login with Google' className="btn w-full h-[5dvw] md:h-[4dvw] lg:h-[3dvw] lg:text-1" type={'button'}
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