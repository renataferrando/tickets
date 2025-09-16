"use client";
import Link from "next/link";
import PageAnimationWrapper from "@/app/components/common/animation-wrapper/bars";
import Slider from "@/app/components/events/slider";
import { Box, Divider } from "@mui/material";
import ScrollTrigger from "gsap/ScrollTrigger";
import React from "react";
import gsap from "gsap";
import colors from "tailwindcss/colors";
// import { useGSAP } from "@gsap/react";
import ReactLenis from "lenis/react";

const categories = [
  { id: 1, name: "Sports" },
  { id: 2, name: "Music" },
  { id: 3, name: "Theater" },
  { id: 4, name: "Children" },
  { id: 5, name: "Cinema" },
  { id: 6, name: "View all" },
] as const;

gsap.registerPlugin(ScrollTrigger);

const MyEventsPage = () => {
  // const lenisRef = useRef();

  // useGSAP(() => {
  //   let tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".section",
  //       start: "top top",
  //       end: "bottom end",
  //       markers: true,
  //     },
  //   });
  //   // tl.to("#section-1", {});
  // }, []);

  // useEffect(() => {
  //   function update(time) {
  //     lenisRef.current?.lenis?.raf(time * 1000);
  //   }

  //   gsap.ticker.add(update);

  //   return () => gsap.ticker.remove(update);
  // }, []);
  return (
    <PageAnimationWrapper>
      <ReactLenis root>
        <div
          id="section-1"
          data-bgcolor="bg-sky-800"
          className="section flex h-[100vh] px-20 items-center overflow-hidden"
        >
          <Slider />
        </div>
        <div
          id="section-2"
          data-bgcolor={colors.sky[950]}
          className="section h-[100vh] flex flex-col items-center justify-center w-screen text-white"
        >
          <p className="category-text text-[9em] 4xl:text-[11em] px-10 opacity-90 text-slate-300 pt-[300px] whitespace-nowrap">
            Search your category
          </p>
        </div>

        <Box
          id="section-3"
          className="section h-[95vh] bg-black"
          ref={null}
          // data-lenis-prevent
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
                  // onClick={handleCategoryClick}
                  className={`category-box p-4 rounded-3xl my-4 flex w-full cursor-pointer ${
                    index % 2 === 0
                      ? "left  px-6 justify-start transform-translate-x-[-50%] opacity-0"
                      : "right px-6 justify-end transform-translate-x-[50%] opacity-0"
                  }`}
                >
                  <h1 className="category-name  text-[6em] 4xl:text-[9em]">
                    <Link href={`/events/category/${category.id}`}>
                      {category.name}
                    </Link>
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
      </ReactLenis>
    </PageAnimationWrapper>
  );
};

export default MyEventsPage;
