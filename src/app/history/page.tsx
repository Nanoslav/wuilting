import React from 'react';
import Calendar from 'react-calendar'
import {FormCalendar} from "@/app/components/form/Calendar";
import {redirect} from "next/navigation";

const History = () => {

    return (
        <main className={'w-full h-full flex justify-center items-center'} >
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