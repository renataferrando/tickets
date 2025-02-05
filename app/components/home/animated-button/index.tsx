"use client";
/* eslint-disable */
 // @ts-nocheck 


import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedButton = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]); // Array of refs for each letter

  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, 16); // Adjust to the exact number of letters

    return () => {
      gsap.killTweensOf([dotRef.current, ...letterRefs.current]);
    };
  }, []);

  const handleMouseEnter = () => {
    const tl = gsap.timeline();

    tl.to(letterRefs.current, {
      opacity: 0, // Fade out letters
      duration: 0.1,
      ease: "power2.inOut",
      stagger: 0.02, // Stagger animation for each letter
    })
      .to(
        dotRef.current,
        {
          x: "160px", // Move the dot across the button
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.3" // Sync with letter animation
      )
      .to(
        dotRef.current,
        {
          x: "0%", // Move the dot back to the start
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      .to(letterRefs.current, {
        opacity: 1, // Fade letters back in
        duration: 0.1,
        ease: "power2.inOut",
        stagger: 0.01, // Stagger animation for each letter
      });
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        className="relative w-[200px] p-2 2xl:p-4 text-sm 3xl:text-[16px] 4xl:w-[300px] 4xl:text-[24px] flex items-center justify-center bg-black bg-opacity-80 text-opacity-80 text-white rounded font-semibold tracking-widest overflow-hidden"
      >
        <span ref={dotRef} className="text-xl mr-3 mt-[2px]">
          •
        </span>
        {[
          "G",
          "e",
          "t",
          "-",
          "y",
          "o",
          "u",
          "r",
          "-",
          "t",
          "i",
          "c",
          "k",
          "e",
          "t",
          "!",
        ].map((char, index) => (
          <span
            key={index}
            ref={(el) => (letterRefs.current[index] = el!)} // Assign ref to each letter
            style={{
              display: "inline-block",
              opacity: 1, // Initially visible
              transform: "translateY(0)", // Initially in place
            }}
          >
            {char === "-" ? "\u00A0" : char}
          </span>
        ))}
      </button>
    </div>
  );
};

export default AnimatedButton;
