import React from "react";
import UserIcon from "@/app/components/navbar/UserIcon";
import Link from "next/link";

export const Navbar = () => {

    const menuItems = (
        <>
            <li>
                <Link href="/" title={'Home'}>Home</Link>
            </li>
            <li>
                <Link href="/shop" title={'Shop'}>Shop</Link>
            </li>
            <li>
                <Link href="/about" title={'About us'}>About us</Link>
            </li>
            <li>
                <Link href="/privacy-policy" title={'Privacy Policy'}>Privacy Policy</Link>
            </li>
        </>
    )

    return (
        <div className="navbar bg-base-100 px-0.5/10 z-10 opacity-100">
        <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" title={'Collapse/Expand'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl" title={'Wuilting'}>Wuilting</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <UserIcon />
            </div>
        </div>
    );
};