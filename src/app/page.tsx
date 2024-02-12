"use client"

import Image from "next/image";
import {account} from "@/app/lib/appwrite";
import {useEffect, useState} from "react";

export default function Home() {

  const [userDetails, setUserDetails] = useState<any>();
  const fetchUser = async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log("the error that happened:", error);
      return Login();
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const Login = () => {
    try {
      const response = account.createOAuth2Session(
          "discord",
          process.env.NEXT_PUBLIC_HOSTNAME,
          process.env.NEXT_PUBLIC_HOSTNAME + "/login"
      );
    } catch (error) {
      console.error("Failed to create OAuth session:", error);
    }
  };

  return (
      <main>
        {userDetails ? (
          <div>
            <div className="container u-padding-64 u-text-center">
              <p className="text u-normal">
                <b>Patient Name</b>: {userDetails.name}
              </p>
              <p className="text u-normal">
                <b>Email</b>: {userDetails.email}
              </p>
            </div>
          </div>
          ) : (
          <div className="container u-padding-64 u-text-center">
          <h1>Redirecting to authentication page...</h1>
          </div>
          )}
      </main>
  );
}
