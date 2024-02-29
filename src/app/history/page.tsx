import React from 'react';
import {FormCalendar} from "@/app/components/form/Calendar";

export const metadata = {
    title: 'History',
}

const History = () => {

    return (
        <main className={'w-full flex justify-center items-center h-9.5/10'} >
            <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.25/10 z-10 min-w-4/10'}>
                <h2 className='text-center text-2.5 font-bold'>🌟 Wuilting History ✨</h2>
                <div className='flex flex-col items-center justify-between w-full'>
                    <FormCalendar />
                </div>
            </div>
        </main>
    )
}

export default History;