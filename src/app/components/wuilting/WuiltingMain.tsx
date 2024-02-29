"use client"

import WuiltingObject from "@/app/utils/interfaces/Wuilting";

export const revalidate = 0

import React, {useEffect, useRef, useState} from 'react';
import {useUserContext} from "@/app/utils/UserContext";
import Spinner from "@/app/components/Spinner";
import {client, database, databases} from "@/app/lib/appwrite";
import {ID, Query} from "appwrite";
import {UserDBObject, UserObject} from "@/app/utils/interfaces/User";
export const WuiltingMain = () => {

    const { loggedInUser } = useUserContext();
    const loggedInUserRef = useRef<UserObject | "none">(loggedInUser);

    const [isLastWuilter, setIsLastWuilter] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [wuiltings, setWuiltings] = useState<WuiltingObject[]>([]);
    const wuiltingsRef = useRef<WuiltingObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const updateWuiltings = (document: WuiltingObject) => {
        const newWuiltings = [document, ...wuiltingsRef.current]
        if(newWuiltings.length > 5) newWuiltings.pop()
        wuiltingsRef.current = newWuiltings;
        setWuiltings(newWuiltings);
        setTimeout(() => {
            inputRef.current?.focus();
        },  50);
    }

    const checkLoggedInUser = (res: string) => {
        if(loggedInUser && res && loggedInUserRef.current !== 'none' && res !== loggedInUserRef.current?.$id){
            setIsLastWuilter(true);
        }
        return false;
        // TODO: check if this works as intended
        // return res && res !== loggedInUserRef.current.$id;
    };

    useEffect(() => {
        const fetchWuiltings = async () => {
            const fetchedWuiltings: any = await databases.listDocuments(database, 'wuilting', [Query.orderDesc("$updatedAt"), Query.limit(5)]);
            if(fetchedWuiltings){
                setWuiltings(fetchedWuiltings.documents);
                wuiltingsRef.current = fetchedWuiltings.documents
            }
        }
        fetchWuiltings();

        setLoading(false)

        const unsubscribe = client.subscribe(`databases.${database}.collections.wuilting.documents`, response => {
            const res: any = response.payload
            if(response.events.includes(`databases.${database}.collections.wuilting.documents.*.create`) && res && checkLoggedInUser(res?.author?.$id)){
                updateWuiltings(res);
            }
        });

        return () => {
            unsubscribe()
        };

    }, []);

    useEffect(() => {
        if(loggedInUser){
            loggedInUserRef.current = loggedInUser;
            if(wuiltingsRef.current[0] && wuiltingsRef.current[0].author.$id === loggedInUser.$id){
                setIsLastWuilter(true);
            } else {
                setIsLastWuilter(false);
            }
        } else {
            setIsLastWuilter(true);
            loggedInUserRef.current = 'none'
        }
    }, [loggedInUser]);

    if(loggedInUser === 'pending' || !loggedInUserRef.current){
        return <Spinner />
    }

    const submitWuilting = async (e: any) => {
        e.preventDefault();
        setIsLastWuilter(true);
        const wuilting = inputRef.current?.value;
        inputRef.current!.value = '';
        if (wuilting && !isLastWuilter) {
            const oneWord = wuilting.split(' ')[0];

            inputRef.current!.value = '';

            const newWuiltingObject: WuiltingObject = {
                word: oneWord,
                $id: 'newWuilting',
                $createdAt: new Date(),
                $updatedAt: new Date(),
                $permissions: [],
                author: loggedInUser,
                $databaseId: database,
                $collectionId: 'wuilting',
            }

            updateWuiltings(newWuiltingObject)

            await databases.createDocument(database, 'wuilting', ID.unique(), {
                word: oneWord,
                author: loggedInUser.$id
            });
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-center'>
            <div className="card w-full bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-1.5">Last words...</h2>
                    <div className='flex flex-col justify-center items-center text-center gap-0.25/10'>
                        {(wuiltings && wuiltings.length === 5) && <span className='opacity-10 text-1.25'>...</span>}
                        {(loggedInUser === 'pending' || loading) ?
                                <Spinner />
                            : (
                                wuiltings.toReversed().map((wuilting: WuiltingObject, index: number) => {
                                    return (
                                        <span key={index} className={`opacity-${((index + 1) * 20).toString()} text-1.25`}>{wuilting.word}</span>
                                    )
                                }, [])
                        )}

                    </div>
                    <form className="card-actions w-full" onSubmit={submitWuilting}>
                        <input type="text text-1.25" placeholder="🔥 Next word?"
                               className="input input-bordered w-full" ref={inputRef} disabled={isLastWuilter} autoFocus />
                        <button type="submit" className="invisible w-0 h-0" disabled={isLastWuilter} title={'Submit'}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WuiltingMain;