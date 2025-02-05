/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useRef, useEffect } from "react";

import { gsap } from "gsap";
import Link from "next/link";

const Menu: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cornerRefs = useRef<HTMLSpanElement[]>([]);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const hrRef = useRef<HTMLHRElement | null>(null);

  useEffect(() => {
    if (!gridRef.current || !triggerRef.current || !hrRef.current) return;

    const dots = gridRef.current.children as HTMLCollection;

    // Define corner dots
    cornerRefs.current = [
      dots[0] as HTMLSpanElement, // Top-left corner
      dots[2] as HTMLSpanElement, // Top-right corner
      dots[6] as HTMLSpanElement, // Bottom-left corner
      dots[8] as HTMLSpanElement, // Bottom-right corner
    ];

    const rotateAndHide = () => {
      const tl = gsap.timeline();

      // Animate the line expanding while grid rotates
      tl.to(
        hrRef.current,
        {
          width: "100%",
          duration: 0.5,
          ease: "power2.out",
        },
        0 // Start immediately
      );

      // Rotate the grid
      tl.to(
        gridRef.current,
        {
          rotation: 180,
          duration: 1,
          ease: "power2.inOut",
        },
        0 // Start at the same time as the line
      );

      // Fade out the corner dots while grid rotates
      tl.to(
        cornerRefs.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5" // Overlap with the grid rotation
      );
    };

    const resetAnimation = () => {
      const tl = gsap.timeline();

      // Reset the line width
      tl.to(
        hrRef.current,
        {
          width: "0%",
          duration: 0.5,
          ease: "power2.out",
        },
        0 // Start immediately
      );

      // Reset the grid rotation
      tl.to(
        gridRef.current,
        {
          rotation: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0 // Start at the same time as the line
      );

      // Fade in the corner dots while grid rotates back
      tl.to(
        cornerRefs.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5" // Overlap with the grid reset
      );
    };

    // Add event listeners
    triggerRef.current.addEventListener("mouseenter", rotateAndHide);
    triggerRef.current.addEventListener("mouseleave", resetAnimation);

    // Cleanup
    return () => {
      triggerRef.current?.removeEventListener("mouseenter", rotateAndHide);
      triggerRef.current?.removeEventListener("mouseleave", resetAnimation);
    };
  }, []);

  return (
    <div className="flex flex-col max-w-[45%] gap-4">
      <Link href="/events">
        <hr
          ref={hrRef}
          className="border-none h-[0.5px] bg-white  color-white opacity-70"
        />
        <div
          ref={triggerRef}
          className="flex gap-6 mt-3 justify-between px-6 cursor-pointer"
        >
          <p className="font-normal 4xl:text-[24px]">Explore events</p>
          <div
            ref={gridRef}
            className="grid grid-cols-3 grid-rows-3 self-center gap-x-2"
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="text-[6px] 4xl:text-[8px]">
                •
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
