"use client";

import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import "./styles.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "tailwindcss/colors";
import { Box, Divider } from "@mui/material";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 1, name: "Sports" },
  { id: 2, name: "Music" },
  { id: 3, name: "Theater" },
  { id: 4, name: "Children" },
  { id: 5, name: "Cinema" },
  { id: 6, name: "Other" },
] as const;

const Categories = ({ scrollActive }: { scrollActive: boolean }) => {
  const overlay = useRef(null);
  const [categoryOpen, ,] = useState(false);
  const categorySectionRef = useRef(null);

  useGSAP(() => {
    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const x = Math.round((clientX / window.innerWidth) * 100);
      const y = Math.round((clientY / window.innerHeight) * 100);

      gsap.to(overlay.current, {
        "--x": `${x}%`,
        "--y": `${y}%`,
        duration: 0.3,
        ease: "sine.out",
      });
    });
  }, []);

  console.log(scrollActive);

  useEffect(() => {
    if (!scrollActive) {
      const lenis = new Lenis({
        wrapper: categorySectionRef.current,
        smooth: true,
        direction: "vertical",
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      return () => {
        lenis.destroy();
      };
    }
  }, [scrollActive]);

  // Function to expand the clipPath
  const handleCategoryClick = () => {
    console.log("hola");

    gsap.to(overlay.current, {
      clipPath: "circle(150% at 50% 50%)", // Expands to cover the entire screen
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <div
      id="section-3"
      data-bgcolor={colors.sky[950]}
      className="section min-h-[100vh] flex flex-col items-center justify-center w-screen text-white"
    >
      <p className="category-text text-[9em] 4xl:text-[11em] px-10 opacity-90 text-slate-300 pt-[300px] whitespace-nowrap">
        Search your category
      </p>

      <Box
        ref={categorySectionRef}
        className="category-section relative opacity-0 py-8 bg-sky-600 h-[100vh] w-full mt-[350px] scale-75"
      >
        <div className="flex flex-col gap-4 w-[80%]  justify-self-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-wrapper px-10 w-1/2 ${
                index % 2 === 0 ? "ml-0" : "ml-auto"
              }`}
            >
              <div
                onClick={handleCategoryClick} // Trigger animation
                className={`category-box p-4 rounded-3xl my-4 flex w-full cursor-pointer ${
                  index % 2 === 0
                    ? "left  px-6 justify-start transform-translate-x-[-50%] opacity-0"
                    : "right px-6 justify-end transform-translate-x-[50%] opacity-0"
                }`}
              >
                <h1 className="category-name  text-[6em] 4xl:text-[9em]">
                  {category.name}
                </h1>
              </div>
              {index < categories.length - 1 && (
                <Divider
                  className="divider w-0"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            </div>
          ))}
        </div>
      </Box>

      {/* Overlay effect */}
      {/* <Box
        ref={overlay}
        className={`category-section-2 opacity-0 py-8 bg-black fixed top-0 left-0 overflow-y-auto h-[100vh] w-[100vw] ${
          !categoryOpen ? "pointer-events-none" : ""
        }`}
        sx={{
          clipPath: categoryOpen
            ? "circle(150% at 50% 50%)"
            : "circle(100px at var(--x, 50%) var(--y, 50%))",
          transition: "clipPath 700ms ease-in-out",
        }}
      >
        <div className="flex flex-col gap-4 w-[80%] justify-self-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-wrapper px-10 w-1/2 ${
                index % 2 === 0 ? "ml-0" : "ml-auto"
              }`}
            >
              <div
                className={`category-box p-4 rounded-3xl my-4 flex w-full cursor-pointer ${
                  index % 2 === 0
                    ? "left  px-6 justify-start transform-translate-x-[-50%] opacity-0"
                    : "right px-6 justify-end transform-translate-x-[50%] opacity-0"
                }`}
              >
                <h1 className="category-name text-[6em] 4xl:text-[9em]">
                  {category.name}
                </h1>
              </div>
              <Divider
                className="divider w-0"
                sx={{ backgroundColor: "white" }}
              />
            </div>
          ))}
        </div>
      </Box> */}
    </div>
  );
};

export default Categories;
