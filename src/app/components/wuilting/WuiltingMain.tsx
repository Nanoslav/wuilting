"use client"

export const revalidate = 0

import React, {useEffect, useRef, useState} from 'react';
import {useUserContext} from "@/app/utils/UserContext";
import Spinner from "@/app/components/Spinner";
import {client, database, databases} from "@/app/lib/appwrite";
import {ID, Query} from "appwrite";
export const WuiltingMain = () => {

    const { loggedInUser } = useUserContext();

    const [isLastWuilter, setIsLastWuilter] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const [wuiltings, setWuiltings] = useState<any>([]);
    const wuiltingsRef = useRef<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const updateWuiltings = (document: any) => {
        const newWuiltings = [document, ...wuiltingsRef.current]
        if(newWuiltings.length > 5) newWuiltings.pop()
        wuiltingsRef.current = newWuiltings;
        setWuiltings(newWuiltings);
    }

    useEffect(() => {
        const fetchWuiltings = async () => {
            const fetchedWuiltings = await databases.listDocuments(database, 'wuilting', [Query.orderDesc("$updatedAt"), Query.limit(5)]);
            if(fetchedWuiltings){
                setWuiltings(fetchedWuiltings.documents);
                wuiltingsRef.current = fetchedWuiltings.documents
            }
        }
        fetchWuiltings();

        setLoading(false)

        const unsubscribe = client.subscribe(`databases.${database}.collections.wuilting.documents`, response => {
            const res: any = response.payload

            if(response.events.includes(`databases.${database}.collections.wuilting.documents.*.create`)){
                updateWuiltings(res)
            }
        });

        return () => {
            unsubscribe()
        };

        setLoading(false)

    }, []);

    if(!loggedInUser){
        return <Spinner />
    }

    useEffect(() => {
        if(wuiltings && wuiltings[0] && wuiltings[0].author.$id === loggedInUser.$id){
            setIsLastWuilter(true)
        } else {
            setIsLastWuilter(false)
            setTimeout(() => {
                inputRef.current?.focus();
            },  50);
        }
    }, [wuiltings]);

    const submitWuilting = async (e: any) => {
        e.preventDefault();
        const wuilting = inputRef.current?.value;
        if (wuilting) {
            const oneWord = wuilting.split(' ')[0];
            await databases.createDocument(database, 'wuilting', ID.unique(), {
                word: oneWord,
                author: loggedInUser.$id
            });
        }
        inputRef.current!.value = '';
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-center'>
            <div className="card w-full bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-1.5">Last words...</h2>
                    <div className='flex flex-col justify-center items-center text-center gap-0.25/10'>
                        {(wuiltings && wuiltings.length === 5) && <span className='opacity-10 text-1.25'>...</span>}
                        {(!loggedInUser || loading) ?
                                <Spinner />
                            : (
                                wuiltings.toReversed().map((wuilting: any, index: number) => {
                                    return (
                                        <span key={index} className={`opacity-${((index + 1) * 20).toString()} text-1.25`}>{wuilting.word}</span>
                                    )
                                }, [])
                        )}

                    </div>
                    <form className="card-actions w-full" onSubmit={submitWuilting}>
                        <input type="text text-1.25" placeholder="🔥 Next word?"
                               className="input input-bordered w-full" ref={inputRef} disabled={isLastWuilter} autoFocus />
                        <button type="submit" className="invisible w-0 h-0" disabled={isLastWuilter}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WuiltingMain;