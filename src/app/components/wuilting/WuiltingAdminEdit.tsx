"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {useUserContext} from "@/app/utils/UserContext";
import sendToast from "@/app/utils/sendToast";
import {database, databases} from "@/app/lib/appwrite";
import {ID, Permission, Role} from "appwrite";

export const WuiltingAdminEdit = ({ text, words, wuiltingDate } : { text: string, words: number, wuiltingDate: Date }) => {

    const { loggedInUser } = useUserContext();
    const [loading, setLoading] = useState<boolean>(false);

    if(!loggedInUser || loggedInUser === "pending" || !loggedInUser.labels.includes("admin")) {
        return ""
    }

    const saveWuilting = async () => {
        try {
            setLoading(true);

            // const jwt = await account.createJWT()
            //
            // let constructedBody = JSON.stringify({
            //     "text": text,
            //     "words": words,
            //     "jwt": jwt
            // });
            //
            // const response = await fetch(`/api/saveWuilting`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: constructedBody
            // });
            //
            // console.log(response)
            //
            // if (!response.ok) {
            //     throw new Error('Failed to save wuilting');
            // }

            await databases.createDocument(
                database,
                'wuilting_history',
                ID.unique(),
                {
                    word: text,
                    words: words,
                    date: wuiltingDate,
                    author: loggedInUser.$id
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.team("admin")),
                    Permission.delete(Role.team("admin")),
                ]
            );

            sendToast('success', 'Wuilting saved successfully');
        } catch (err: any) {
            sendToast('error', err.message)
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="absolute top-0 right-0 flex">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-square text-1">
                    {loading ? <span className="loading loading-ring loading-lg"></span> : <FontAwesomeIcon icon={faPenToSquare} />}
                </div>
                <ul tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                    <li><a href={"#"} onClick={saveWuilting}>Save</a></li>
                    <li><a href={'#'}>Edit</a></li>
                </ul>
            </div>
        </div>
    );
};