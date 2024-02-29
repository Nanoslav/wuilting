import React from 'react';
import WuiltingObject from "@/app/utils/interfaces/Wuilting";
import {WuiltingHistoryMain} from "@/app/components/wuilting/WuiltingHistoryMain";

export const revalidate = 0;

const WuiltingHistory = async ({params}: { params: { "date": string } }) => {

    const decodedDateString = decodeURIComponent(params.date);
    const date = new Date(decodedDateString);

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 1).toISOString();
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).toISOString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/getWuiltings/${params.date}`); //  Must be fetch() in order for this route to be cached
    const wuiltings: WuiltingObject[] = JSON.parse(await response.text());

    const wuiltingWords = wuiltings.map((wuilting: WuiltingObject) => wuilting.word).join(' ');
    const wuiltingWordCount = (wuiltings && wuiltings[0] && wuiltings[0].words) ? wuiltings[0].words : wuiltingWords.length;

    return (
        <main className={'w-full h-full flex justify-center items-center'}>
            <WuiltingHistoryMain wuiltingWords={wuiltingWords} wuiltings={wuiltings} wuiltingWordCount={wuiltingWordCount} end={end} start={start} />
        </main>
    )

};

export default WuiltingHistory;