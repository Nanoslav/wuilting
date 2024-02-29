"use client"

import React, {useEffect, useState} from 'react';
import Tippy from "@tippyjs/react";
import AnchorLink from "@/app/components/form/AnchorLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {useUserContext} from "@/app/utils/UserContext";
import {avatars} from "@/app/lib/appwrite";
import Link from "next/link";

const UserIcon = () => {

    const { loggedInUser } = useUserContext();

    if(!loggedInUser || loggedInUser === "pending") {
        return ""
    }

    return (
        <div className="flex flex-row justify-center items-center gap-[0.5dvw]">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt={`${loggedInUser.name}`}
                             src={`${avatars.getInitials()}`}/>
                    </div>
                </div>
                <ul tabIndex={0}
                    className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li><Link href={'#'} title={loggedInUser.name}>{loggedInUser.name} - {loggedInUser.money} 🪙</Link></li>
                    <li><Link href={'#'} title={'Profile'}>Profile</Link></li>
                    <li><Link href={'#'} title={'Settings'}>Settings</Link></li>
                    <li><Link href={'logout'} title={'Logout'}>Logout</Link></li>
                </ul>
            </div>
            {loggedInUser.labels.includes("admin") && (
                <div className="flex w-full justify-center text-1">
                    <FontAwesomeIcon icon={faUserTie}/>
                </div>
            )}
        </div>
    );
};

export default UserIcon;