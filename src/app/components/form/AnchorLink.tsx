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
        <Link href={href} className={`text-1 dark:text-light dark:hover:text-light-hover text-dark hover:text-dark-hover transition-all ${className}`} title={title}>{icon ?? ""} {title}</Link>
    );
};

export default AnchorLink;