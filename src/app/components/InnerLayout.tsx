"use client"

import React from "react";
import {UserContextProvider} from "@/app/utils/UserContext";
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