"use client"

import Link from "next/link";
import {WuiltingAdminEdit} from "@/app/components/wuilting/WuiltingAdminEdit";
import {WuiltingHistoryWords} from "@/app/components/wuilting/WuiltingHistoryWords";
import React, {useRef, useState} from "react";
import WuiltingObject from "@/app/utils/interfaces/Wuilting";

export const WuiltingHistoryMain = ({ wuiltingWords, wuiltingWordCount, wuiltings, start, end } : { wuiltingWords: string, wuiltingWordCount: number, wuiltings: WuiltingObject[], start: string, end: string }) => {

    const [editable, setEditable] = useState<boolean>(false);
    const wordsRef = useRef<HTMLDivElement>(null);

    return (
        <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.25/10 z-10 w-6/10'}>
            <div className="relative">
                <Link href={"/history"} className="absolute top-0 left-0 btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </Link>
                <WuiltingAdminEdit wuiltingDate={((wuiltings && wuiltings[0] && wuiltings[0].$updatedAt) ? wuiltings[0].$updatedAt : new Date())} wordsRef={wordsRef}
                                   isSaved={(wuiltings && wuiltings[0] && wuiltings[0].words) ? wuiltings[0].$id : null} editable={editable} setEditable={setEditable} />
            </div>
            <h2 className='text-center text-2.5 font-bold'>⏰ Wuilting History 📜</h2>
            <h3 className="text-center text-1">
                {`${new Date(start).toLocaleDateString('cs-CZ')} ${new Date(start).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hourCycle: "h23"
                })} - 
                ${new Date(end).toLocaleDateString('cs-CZ')} ${new Date(end).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hourCycle: "h23"
                })}`}
            </h3>
            <div className='flex flex-col items-center justify-between w-full px-[2dvw] h-[40dvh] overflow-y-auto'>
                <WuiltingHistoryWords words={wuiltingWords} editable={editable} wordsRef={wordsRef} />
            </div>
            {wuiltingWordCount}
        </div>
    );
};