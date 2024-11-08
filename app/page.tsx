"use client";
// app/page.tsx

import UserForm from "../components";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/profile", {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
        } else {
          throw new Error("Failed to fetch profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <UserForm />
        <a href="/api/auth/logout">Log out</a>
        <a href="/api/auth/login">Login</a>
      </main>
    </div>
  );
}
