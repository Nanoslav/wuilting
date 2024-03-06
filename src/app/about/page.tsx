import Image from 'next/image';
import AnchorLink from "@/app/components/form/AnchorLink";

export const metadata = {
    title: 'About us',
    description: 'Meet the team behind Wuilting',
}

export default function About() {
    return (
        <main className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div
                className="p-0.5/10 lg:p-0.25/10 m-auto rounded-md shadow-md w-9/10 md:w-6/10 lg:w-4/10 bg-base-100 text-3 sm:text-2 md:text-1.5 lg:text-1">
                <h1 className="mb-1 text-5xl font-semibold text-center">
                    💫 Wuilting 💫
                </h1>
                <h2 className="mb-5 font-semibold text-center">
                    About us ❤️
                </h2>
                <div className="flex flex-col gap-[0.5dvw] h-3/5">
                    <p className="text-center">
                        🕵️‍♂️ Quick Reminder: You can always watch history! <br /> After 24 hours since a day ends, you can
                        view its <AnchorLink href={'/history'} title={'story'} />!
                    </p>
                    <h3 className="mb-3 text-5 lg:text-2 font-semibold text-center">How to Play:</h3>
                    <p>
                        React with your enthusiasm to join this linguistic adventure! 🎉
                    </p>
                    <h3 className="mt-3 mb-3 text-5 lg:text-2 font-semibold text-center">Rules:</h3>
                    <ul>
                        <li>1️⃣ Only your first word in a message counts, others are ignored. 🤞</li>
                        <li>2️⃣ You can only type if someone else has written before you. 🤔</li>
                        <li>3️⃣ If you want to end a sentence, simply put a dot after the last word, e.g., &apos;afternoon.&apos;
                            - same goes for commas, &apos;afternoon,&apos; - there is no need for spaces as the program adds them
                            after each word. 📅
                        </li>
                        <li>5️⃣ After a day, all words will be compiled into a text. 🔄</li>
                    </ul>
                    <p className="mt-3">
                        Are you ready to shape our collective story? 🌱✨
                    </p>
                </div>
            </div>
        </main>
    );

}