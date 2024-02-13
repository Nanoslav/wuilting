"use client"

import Image from "next/image";
import {account} from "@/app/lib/appwrite";
import {useEffect, useState} from "react";
import {useUserContext} from "@/app/utils/UserContext";

export default function Home() {

    const {loggedInUser, setLoggedInUser} = useUserContext();

    return (
      <main className={'w-full h-full flex justify-center items-center bg-dark'} >
          <div className={'w-2/3 h-2/3 bg-dark-hover rounded-xl flex flex-col p-0.25/10'}>
            <h2 className='text-center text-3'>Wuilting</h2>
            <h3>Welcome, {loggedInUser.name}</h3>
          </div>
      </main>
    );
}
