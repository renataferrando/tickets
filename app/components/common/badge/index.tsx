"use client";
import React from "react";
import clsx, { type ClassInput } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...x: ClassInput[]) => twMerge(clsx(x));

const Badge = ({
  icon,
  text,
  className,
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-gray-100 rounded-full px-2 py-1 flex items-center gap-2 w-fit text-sm text-gray-500 justify-center",
        className
      )}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default Badge;
