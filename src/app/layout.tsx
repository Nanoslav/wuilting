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
  title: "Wuilting",
  description: "The Ultimate Human Random Text Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden h-screen w-screen`}>
          <InnerLayout>
              <Navbar />
              {children}
          </InnerLayout>
      </body>
    </html>
  );
}
