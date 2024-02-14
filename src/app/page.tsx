"use client"

import Image from "next/image";
import {account} from "@/app/lib/appwrite";
import React, {useEffect, useState} from "react";
import {useUserContext} from "@/app/utils/UserContext";
import Spinner from "@/app/components/Spinner";
import ParticleBackground from "@/app/components/ParticleBackground";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClockRotateLeft, faRankingStar, faStar} from "@fortawesome/free-solid-svg-icons";

export default function Home() {

    const {loggedInUser, setLoggedInUser} = useUserContext();

    if(loggedInUser === 'pending' || !loggedInUser) {
        return <Spinner />
    }

    return (
      <main className={'w-full h-full flex justify-center items-center'} >
          <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.25/10 z-10 min-w-4/10'}>
              <h2 className='text-center text-2.5 font-bold'>🌟 Wuilting ✨</h2>
              <div className='flex flex-row items-center justify-between w-full'>
                  <button className="btn text-1 w-3/10"><FontAwesomeIcon icon={faRankingStar}/> Leaderboard</button>
                  <button className="btn text-1 w-3/10"><FontAwesomeIcon icon={faStar} /> Top Wuilters</button>
                  <button className="btn text-1 w-3/10"><FontAwesomeIcon icon={faClockRotateLeft} /> History</button>
              </div>
              <div className='w-full h-full flex flex-col justify-center items-center text-center'>
                  <div className="card w-full bg-base-200 shadow-xl">
                      <div className="card-body">
                          <h2 className="card-title text-1.5">Last words...</h2>
                          <div className='flex flex-col justify-center items-center text-center gap-0.25/10'>
                              <span className='opacity-10 text-1.25'>...</span>
                              <span className='opacity-20 text-1.25'>dog</span>
                              <span className='opacity-40 text-1.25'>ate</span>
                              <span className='opacity-60 text-1.25'>bea</span>
                              <span className='opacity-80 text-1.25'>after</span>
                              <span className='opacity-100 text-1.25'>Amy</span>
                          </div>
                          <div className="card-actions w-full">
                              <input type="text text-1.25" placeholder="🔥 Next word?" className="input input-bordered w-full"/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
    );
}
