"use client";

import { usePathname, useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  ariaLabel?: string;
}

const BackButton = ({ className, ariaLabel = "Go back" }: BackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      type="button"
      onClick={() => {
        const isEventsChild = pathname?.startsWith("/events/");
        if (isEventsChild) {
          router.push("/events");
        } else {
          router.back();
        }
      }}
      aria-label={ariaLabel}
      className={`w-8 h-8 flex items-center justify-center rounded-full text-white bg-transparent shadow-none hover:shadow-none focus:outline-none ${
        className ?? ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 20 L10 12 L20 4" />
      </svg>
    </button>
  );
};

export default BackButton;
