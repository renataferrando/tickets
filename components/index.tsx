"use client"; // This makes the component a client-side component

import { useState } from "react";

import { editUser } from "../app/actions/users";

export default function UserForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await editUser({ name: "Maria" }, 2);
      setStatus("User created successfully!");
    } catch (error) {
      console.error("Error creating user", error);
      setStatus("Error creating user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        type="text"
        placeholder="First Name"
        className="rounded border border-solid p-2"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        name="lastName"
        type="text"
        placeholder="Last Name"
        className="rounded border border-solid p-2"
      />
      <button
        type="submit"
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        {isLoading ? "Creating..." : "Create User"}
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
