"use client"

import {RefObject} from "react";

export const WuiltingHistoryWords = ({words, editable, wordsRef} : {words: string, editable: boolean, wordsRef: RefObject<HTMLDivElement>}) => {

    return (
        <div contentEditable={editable} className='textarea' ref={wordsRef}>{words}</div>
    );
};