"use client";

import gsap from "gsap";
import React from "react";
import "./styles.css";
import { useGetCategoriesQuery } from "@/services/categoryService";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "tailwindcss/colors";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const { data: categories } = useGetCategoriesQuery(null);
  console.log(categories);
  return (
    <>
      <div
        id="section-2"
        data-bgcolor={colors.sky[950]}
        className="section h-screen flex flex-col items-center justify-center w-screen text-white"
      >
        <div className="category-text flex items-center justify-center px-10 py-10 ">
          <p className="word mr-6 text-[9em] 4xl:text-[11em] opacity-90 text-slate-300">
            FIND
          </p>
          <p className="word mr-6 text-[9em] 4xl:text-[11em] opacity-90 text-slate-300">
            YOUR
          </p>
          <p className="word text-[9em] 4xl:text-[11em] opacity-90 text-slate-300">
            CATEGORY
          </p>
        </div>
      </div>
      <div
        id="section-3"
        className="section h-screen w-screen flex gap-20 items-center justify-start px-20 relative overflow-hidden"
        data-bgcolor={colors.sky[700]}
      >
        <div
          id="slider-category"
          className="slider-category h-screen w-screen flex gap-20 opacity-0 items-center justify-start px-20 relative"
        >
          {categories?.map((category) => (
            <div
              key={category.id}
              className="box-wrapper flex-shrink-0 h-[90%] w-[90%] rounded-md bg-[#222a2c] opacity-90 group"
            >
              <div className="category-box h-full w-full grid grid-cols-[50%_50%] py-10 px-20 items-center">
                <p className="category-name text-[6.2rem] text-right ml-10 relative left-[10px]">
                  {category.name.toUpperCase()}
                </p>
                <Image
                  src={category.imageUrl}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "150%", height: "auto" }}
                  className="category-image rounded-lg"
                  alt={"Event image"}
                />
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
