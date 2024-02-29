import React from 'react';
import WuiltingObject from "@/app/utils/interfaces/Wuilting";
import Link from "next/link";

export const revalidate = 86400

const WuiltingHistory = async ({params}: { params: { "date": string } }) => {

    const decodedDateString = decodeURIComponent(params.date);
    const date = new Date(decodedDateString);

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).toISOString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/getWuiltings/${params.date}`); //  Must be fetch() in order for this route to be cached
    const wuiltings: WuiltingObject[] = JSON.parse(await response.text());

    return (
        <main className={'w-full h-full flex justify-center items-center'}>
            <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.25/10 z-10 w-6/10'}>
                <div className="relative">
                    <Link href={"/history"} className="absolute top-0 left-0 btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </Link>
                </div>
                <h2 className='text-center text-2.5 font-bold'>⏰ Wuilting History 📜</h2>
                <h3 className="text-center text-1">
                    {`${new Date(start).toLocaleDateString('cs-CZ')} ${new Date(start).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })} - 
                ${new Date(end).toLocaleDateString('cs-CZ')} ${new Date(end).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })}`}
                </h3>
                <div className='flex flex-col items-center justify-between w-full px-[2dvw] h-[40dvh] overflow-y-scroll'>
                    <div>
                        {wuiltings.map((wuilting: WuiltingObject) => wuilting.word).join(' ')}
                    </div>
                </div>
            </div>
        </main>
    )

};

export default WuiltingHistory;