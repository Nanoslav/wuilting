"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faPenToSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import React, {RefObject, useState} from "react";
import {useUserContext} from "@/app/utils/UserContext";
import sendToast from "@/app/utils/sendToast";
import {account, database, databases} from "@/app/lib/appwrite";
import {ID, Permission, Role} from "appwrite";
import {useRouter} from "next/navigation";

export const WuiltingAdminEdit = ({ wuiltingDate, isSaved, editable, setEditable, wordsRef } : { wuiltingDate: Date, isSaved: string | null, editable: boolean, setEditable: (value: boolean) => void, wordsRef: RefObject<HTMLDivElement> }) => {

    const { loggedInUser } = useUserContext();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    if(!loggedInUser || loggedInUser === "pending" || !loggedInUser.labels.includes("admin")) {
        return ""
    }

    const saveWuilting = async () => {
        try {
            setLoading(true);

            const jwt = await account.createJWT()

            let constructedBody = JSON.stringify({
                "word": wordsRef?.current?.innerHTML,
                "words": wordsRef?.current?.innerHTML.length,
                "jwt": jwt,
                "date": wuiltingDate,
                "author": loggedInUser.$id,
                "isSaved": isSaved
            });

            console.info("CONSTRUCTED BODY: ", constructedBody)

            const response = await fetch(`/api/saveWuilting`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: constructedBody
            });

            if (!response.ok) {
                throw new Error('Failed to save wuilting');
            }

            sendToast('success', 'Wuilting saved successfully');
            router.refresh();
        } catch (err: any) {
            sendToast('error', err.message)
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="absolute top-0 right-0 flex flex-row gap-[1dvw]">
            <a className="btn btn-square text-1" title={editable ? 'Cancel' : 'Edit'} onClick={() => setEditable(!editable)}>
                {loading ? <span className="loading loading-ring loading-lg"></span> :
                    (editable) ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faPenToSquare}/>
                }
            </a>
            <a className="btn btn-square text-1" title={isSaved ? 'Resave' : 'Save'} onClick={saveWuilting}>
                {loading ? <span className="loading loading-ring loading-lg"></span> :
                    <FontAwesomeIcon icon={faSave}/>}
            </a>
        </div>
    );
};