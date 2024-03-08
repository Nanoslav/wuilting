// use client
import React, { Suspense, lazy } from "react";
import { UserContextProvider } from "@/app/utils/UserContext";
import AuthHandler from "@/app/utils/AuthHandler";
import { ToastContainer } from "react-toastify";

import Spinner from "@/app/components/Spinner";

// Lazy load ParticleBackground component
const ParticleBackground = lazy(() => import('@/app/components/ParticleBackground'));

// Lazy load ToastContainer component
const LazyToastContainer = lazy(() => import("react-toastify").then(module => ({ default: module.ToastContainer })));

export function InnerLayout({ children }: { children: React.ReactNode }) {

    return (
        <UserContextProvider>
            <AuthHandler />
            <Suspense fallback={<Spinner />}>
                <Suspense fallback={null}>
                    <ParticleBackground>
                        {children}
                    </ParticleBackground>
                </Suspense>
                <Suspense fallback={null}>
                    <LazyToastContainer />
                </Suspense>
            </Suspense>
        </UserContextProvider>
    )
}
