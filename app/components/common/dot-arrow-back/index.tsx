"use client";

import { useRouter } from "next/navigation";

const DotArrowBack = () => {
  const router = useRouter();
  const pattern = ["..•..", ".••..", "•••••", ".••..", "..•.."];

  return (
    <button
      type="button"
      onClick={() => router.push("/events")}
      title="Back to Events"
      className="flex items-center gap-2 text-white hover:opacity-90 focus:outline-none"
    >
      <div className="grid grid-cols-5 grid-rows-5 gap-x-1 leading-[0]">
        {pattern.map((row, rowIndex) =>
          row.split("").map((cell, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className="block w-1.5 h-1.5 4xl:w-2 4xl:h-2"
              style={{
                opacity: cell === "•" ? 1 : 0,
                backgroundColor: "currentColor",
                borderRadius: "9999px",
              }}
            />
          ))
        )}
      </div>
    </button>
  );
};

export default DotArrowBack;

