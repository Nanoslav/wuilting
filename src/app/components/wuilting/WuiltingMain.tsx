"use client"

import WuiltingObject from "@/app/utils/interfaces/Wuilting";

export const revalidate = 0

import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {useUserContext} from "@/app/utils/UserContext";
import {client, database, databases} from "@/app/lib/appwrite";
import {ID, Query} from "appwrite";
import {UserObject} from "@/app/utils/interfaces/User";
import AnchorLink from "@/app/components/form/AnchorLink";
import {useRouter} from "next/navigation";
export const WuiltingMain = ({ fetchedWuiltings } : { fetchedWuiltings: any }) => {

    const { loggedInUser } = useUserContext();
    const loggedInUserRef = useRef<UserObject | "none">(loggedInUser);
    const [loading, setLoading] = useState<boolean>(true);

    const [isLastWuilter, setIsLastWuilter] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const [wuiltings, setWuiltings] = useState<WuiltingObject[]>([]);
    const wuiltingsRef = useRef<WuiltingObject[]>([]);

    const updateWuiltings = (document: WuiltingObject) => {
        const newWuiltings = [document, ...wuiltingsRef.current]
        if(newWuiltings.length > 5) newWuiltings.pop()
        wuiltingsRef.current = newWuiltings;
        setWuiltings(newWuiltings);
        setTimeout(() => {
            inputRef.current?.focus();
        },  50);
    }

    const isUpdateNeeded = (authorId: string) => {
        if(loggedInUser && authorId && loggedInUserRef.current !== 'none' && authorId === loggedInUserRef.current?.$id){
            setIsLastWuilter(true);
            return false;
        }
        if(loggedInUser) setIsLastWuilter(false);
        return true;
    };

    const fetchData = async () => {

        const fetchedWuiltings: any = await databases.listDocuments(database, 'wuilting', [Query.orderDesc("$updatedAt"), Query.limit(5)]);
        if(fetchedWuiltings){
            setWuiltings(fetchedWuiltings.documents);
            wuiltingsRef.current = fetchedWuiltings.documents
        }

    }

    useEffect(() => {

        if(fetchedWuiltings){
            setWuiltings(fetchedWuiltings.documents);
            wuiltingsRef.current = fetchedWuiltings.documents
        }
        fetchData()

        const unsubscribe = client.subscribe(`databases.${database}.collections.wuilting.documents`, response => {
            const res: any = response.payload
            if(response.events.includes(`databases.${database}.collections.wuilting.documents.*.create`) && res && isUpdateNeeded(res?.author?.$id)){
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
            if(!wuiltingsRef.current[0] || loggedInUser === 'pending' || wuiltingsRef.current[0].author.$id === loggedInUser.$id){
                setIsLastWuilter(true);
            } else {
                setIsLastWuilter(false);
            }
        } else {
            setIsLastWuilter(true);
            loggedInUserRef.current = 'none'
        }
    }, [loggedInUser]);

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

    const opacityList = ['opacity-10', 'opacity-30', 'opacity-50', 'opacity-70', 'opacity-90'];

    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-center'>
            <div className="card w-full bg-base-200 shadow-xl h-full">
                <div className="card-body">
                    <h2 className="card-title text-3 sm:text-2.5 md:text-2 lg:text-1.5">Last words...</h2>
                    <div className='flex flex-col justify-center items-center text-center gap-0.25/10'>
                        {(wuiltings && wuiltings.length === 5) && <span className='opacity-10 text-1.25'>...</span>}
                        {wuiltings.toReversed().map((wuilting: WuiltingObject, index: number) => {
                            return (
                                <span key={index} className={`${opacityList[index]} text-6 sm:text-2.5 md:text-2 lg:text-1.25`}>{wuilting.word}</span>
                            )
                        }, [])}
                    </div>

                    <form className="card-actions w-full" onSubmit={submitWuilting}>
                        <input
                            type="text"
                            placeholder="🔥 Next word?"
                            className="input input-bordered w-full"
                            ref={inputRef}
                            disabled={isLastWuilter}
                            autoFocus
                            pattern="[^\s]+"
                            maxLength={20}
                        />
                        <button type="submit" className="invisible w-0 h-0" disabled={isLastWuilter}
                                title={'Submit'}>Submit
                        </button>
                        <div className='flex flex-col w-full'>
                            {loggedInUser && (
                                <div className="opacity-80 text-5 sm:text-2.5 md:text-1.5 lg:text-1"><AnchorLink
                                    href={'/login'} title={'Log in'}
                                    className='text-teal-500 hover:text-cyan-700 text-5 sm:text-2.5 md:text-1.5 lg:text-1'/> to
                                    post the next word!</div>
                            )}
                            <div className="opacity-80 text-5 sm:text-2.5 md:text-1.5 lg:text-1">What is <AnchorLink
                                href={'/about'} title={'Wuilting'}
                                className='text-teal-500 hover:text-cyan-700 text-5 sm:text-2.5 md:text-1.5 lg:text-1'/>?
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WuiltingMain;