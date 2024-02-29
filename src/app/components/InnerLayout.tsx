"use client"

import React, {useContext, useEffect, useState} from "react";
import {UserContextProvider, useUserContext} from "@/app/utils/UserContext";
import {account} from "@/app/lib/appwrite";
import {usePathname, useRouter} from "next/navigation";
import {Prata} from "next/dist/compiled/@next/font/dist/google";
import AuthHandler from "@/app/utils/AuthHandler";
import ParticleBackground from "@/app/components/ParticleBackground";
import {ToastContainer} from "react-toastify";

export function InnerLayout({ children }: { children: React.ReactNode }) {

    return (
        <UserContextProvider>
            <AuthHandler />
            <ParticleBackground>
                {children}
                <ToastContainer />
            </ParticleBackground>
        </UserContextProvider>
    )
}