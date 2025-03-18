"use client";

import { useGSAP } from "@gsap/react";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useGetEventsQuery } from "@/services/eventService.ts";
import SliderCard from "./slider-card";
import colors from "tailwindcss/colors";
import { Box, Divider } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const Slider = ({
  setScrollActive,
}: {
  setScrollActive: (value: boolean) => void;
}) => {
  const { data: events, error } = useGetEventsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  if (error) console.error("API Error:", error);

  useGSAP(
    () => {
      const lenis = new Lenis();
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      const sections = gsap.utils.toArray(".item");
      const slider = document.getElementById("slider");
      const sectionColor = gsap.utils.toArray<HTMLElement>(".section");

      if (!slider) return;
      const sliderWidth = slider?.offsetWidth;
      const adjustmentFactor = sliderWidth * 0.01;
      const amountOfScroll =
        sliderWidth -
        window.innerWidth +
        sections.length * 20 +
        adjustmentFactor;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-1",
          pin: "#section-1",
          pinSpacing: true,
          scrub: 1,
          end: "+=" + amountOfScroll,
        },
      });
      tl.to("#slider", {
        x: -amountOfScroll,
        ease: "none",
      });

      gsap.to("#upcoming", {
        scale: 2,
        scrollTrigger: {
          trigger: "#upcoming",
          scrub: 2,
          start: "left center",
        },
      });

      sectionColor.forEach((colorSection, i) => {
        const prevBgColor =
          i === 0
            ? colors.sky[800]
            : (sectionColor[i - 1] as HTMLElement).dataset.bgcolor;

        gsap.to("#section-3", {
          scrollTrigger: {
            trigger: "#section-3",
            start: () => amountOfScroll + window.innerHeight * 0.5,
            onEnter: () => {
              gsap.to(".section", {
                backgroundColor: colorSection.dataset.bgcolor,
                overwrite: "auto",
              });
            },
            onLeaveBack: () => {
              gsap.to(".section", {
                backgroundColor: prevBgColor,
                overwrite: "auto",
              });
            },
          },
        });
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".category-text",
          start: "center center",
          end: "+=300",
          scrub: 3,
        },
      });
      tl2.fromTo(
        ".category-text",
        {
          opacity: 0,
          scale: 0.75,
        },
        {
          scale: 1.5,
          duration: 3,
          ease: "power2.out",
          overwrite: "auto",
          opacity: 1,
        }
      );

      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".category-section",
          start: "top 50%",
          markers: true,
          scrub: 3,
          end: "bottom+=80 bottom",
        },
      });
      tl3.to(".category-section", {
        opacity: 0.7,
        duration: 4,
        delay: 1,
        scale: 1,
        onComplete: () => {
          setScrollActive(true);
        },
      });

      tl3.to(".divider", {
        width: "100%",
        duration: 1,
        ease: "power2.out",
      });
      tl3.to(".left", {
        x: 0,
        opacity: 1,
      });
      tl3.to(".right", {
        x: 0,
        opacity: 1,
      });
      tl3.to(".category-section-2", {
        opacity: 1,
      });
    },

    { dependencies: [events], revertOnUpdate: true }
  );

  return (
    <>
      {/* {!isLoading ? ( */}
      <div id="slider" className="flex gap-[20px] w-max relative z-10">
        {events?.events.map((event) => (
          <SliderCard key={event.id} event={event} />
        ))}
      </div>
      <p
        id="upcoming"
        className="absolute left-[10%] bottom-0 4xl:bottom-[5%] z-[-10] text-slate-900 text-[20rem] font-bold opacity-30"
      >
        UPCOMING
      </p>
    </>
  );
};

export default Slider;
