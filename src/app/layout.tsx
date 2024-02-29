import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/app/components/navbar/Navbar";
import {InnerLayout} from "@/app/components/InnerLayout";
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Wuilting",
        template: "Wuilting | %s",
    },
    description: "The Ultimate Human Random Text Generator",
    generator: 'Next.js',
    applicationName: 'Wuilting',
    referrer: 'origin-when-cross-origin',
    keywords: ['Wuilting', 'Wuilting game', 'Word game', 'Human text generator', 'Funny text creator', 'Funny text Maker'],
    authors: [{ name: 'DragonMan' }, { name: 'Ninjonik', url: 'https://ninjonik.igportals.eu' },  {name: 'Nanoslav', url: 'https://nanoslav.eu' }],
    creator: 'Ninjonik',
    publisher: 'IGPortals.eu',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOSTNAME || "localhost:3000"),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US'
        },
    },
    openGraph: {
        title: 'Wuilting',
        description: 'The Ultimate Human Random Text Generator',
        url: 'https://wuilting.vercel.app',
        siteName: 'Wuilting',
        images: [
            {
                url: 'https://nextjs.org/og.png', // Must be an absolute URL
                width: 800,
                height: 600,
            },
            {
                url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
                width: 1800,
                height: 1600,
                alt: 'My custom alt',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wuilting',
        description: 'The Ultimate Human Random Text Generator',
        creator: 'IGPortals.eu',
        images: ['https://nextjs.org/og.png'], // Must be an absolute URL
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon-32x32.png',
        shortcut: '/favicon-32x32.png',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
    <html lang="en">
    <body className={`${inter.className} overflow-hidden h-screen w-screen`}>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <InnerLayout>
            <Navbar/>
            {children}
        </InnerLayout>
    </body>
    </html>
    );
}
