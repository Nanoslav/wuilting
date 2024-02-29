"use client"

import Calendar from "react-calendar";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const FormCalendar = () => {

    const router = useRouter();
    const [value, onChange] = useState<Value>(new Date());

    return (
        <Calendar onChange={onChange} value={value} onClickDay={(value: Date) => router.push(`/history/${encodeURIComponent(value.toISOString())}`)} />
    );
};