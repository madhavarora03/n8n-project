"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserData(data);
    };

    fetchUser();
  }, [getToken]);

  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <pre>{JSON.stringify(userData, null, 2)}</pre>;
    </>
  );
}
