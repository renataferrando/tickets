"use client";
import "./styles.css";

export default function FullAnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        id="banner-1"
        className="min-h-screen bg-sky-950 z-10 fixed top-0 left-0 w-full"
      />
      <h1 className="text text-[9em] 4xl:text-[11em] font-bold text-white fixed top-[50%] left-[50%] z-10 translate-y-[-50%] translate-x-[-50%] opacity-0">
        EVENTS
      </h1>
      {children}
    </>
  );
}
