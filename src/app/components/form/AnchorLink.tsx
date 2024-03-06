"use client"

import React from 'react';
import Link from "next/link";

interface AnchorLinkProps {
    href: string;
    title: string;
    className?: string;
    icon?: React.ReactNode;
}

const AnchorLink: React.FC<AnchorLinkProps> = ({ href, title, className, icon = "" }) => {
    return (
        <Link href={href} className={`text-teal-500 hover:text-cyan-700 text-5 sm:text-2.5 md:text-1.5 lg:text-1 transition-all ${className}`} title={title}>{icon ?? ""} {title}</Link>
    );
};

export default AnchorLink;