"use client";

import { useGSAP } from "@gsap/react";
import React, { useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGetEventsQuery, EventsResponse } from "@/services/eventService";
import SliderCard from "./slider-card";
import { EventType } from "@/app/types/event";
import { sliderAnimation } from "./sliderAnimation";
import EventPreviewModal from "../../common/event-preview-modal";
gsap.registerPlugin(ScrollTrigger);

interface SliderProps {
  initialData?: EventsResponse;
  label?: string;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  setModalOpen?: (open: boolean) => void;
  setEvent?: (event: EventType) => void;
}

const Slider = ({
  initialData,
  label = "UPCOMING",
  setModalOpen,
  setEvent,
}: SliderProps) => {
  const { data: clientData } = useGetEventsQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: Boolean(initialData),
  });
  const eventsResponse = initialData ?? clientData;
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalEvent, setInternalEvent] = useState<EventType | null>(null);

  useGSAP(
    () => {
      const slider = document.getElementById("slider");
      if (!slider) return;

      const container = slider.parentElement as HTMLElement | null;
      const totalWidth = slider.scrollWidth;

      let visibleWidth = window.innerWidth;
      if (container) {
        const styles = getComputedStyle(container);
        const paddingLeft = parseFloat(styles.paddingLeft || "0");
        const paddingRight = parseFloat(styles.paddingRight || "0");
        // clientWidth includes padding; subtract padding to get content box width
        visibleWidth = Math.max(
          0,
          container.clientWidth - paddingLeft - paddingRight
        );

        // Align content if slider is narrower than the visible area
        container.style.justifyContent =
          totalWidth < visibleWidth ? "center" : "flex-start";
      }

      const amountOfScroll = Math.max(0, totalWidth - visibleWidth);
      sliderAnimation(amountOfScroll);

      // sectionColor.forEach((colorSection, i) => {
      //   const prevBgColor =
      //     i === 0
      //       ? colors.sky[800]
      //       : (sectionColor[i - 1] as HTMLElement).dataset.bgcolor;

      //   gsap.to(".wrapper", {
      //     scrollTrigger: {
      //       trigger: colorSection,

      //       start: "top 10%",
      //       onEnter: () => {
      //         gsap.to(".section", {
      //           backgroundColor: colorSection.dataset.bgcolor,
      //           overwrite: "auto",
      //         });
      //       },
      //       onLeaveBack: () => {
      //         gsap.to(".section", {
      //           backgroundColor: prevBgColor,
      //           overwrite: "auto",
      //         });
      //       },
      //     },
      //   });
      // });

      // const tl2 = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".category-text",
      //     pin: true,
      //     start: "center center",
      //     end: "bottom bottom",
      //     scrub: 3,
      //   },
      // });

      // categWord.forEach((word) => {
      //   tl2.fromTo(
      //     word,
      //     {
      //       opacity: 0,
      //     },
      //     {
      //       duration: 4,
      //       ease: "slow",
      //       opacity: 1,
      //       transform: "translateY(50%)",
      //     }
      //   );
      // });

      // tl2.to(".slider-category", {
      //   opacity: 1,
      // });

      // const sliderCategory = document.getElementById("slider-category");
      // const categories = gsap.utils.toArray(".box-wrapper");
      // if (!sliderCategory) return;
      // const sliderCategoryWidth = sliderCategory?.offsetWidth;

      //   const amountOfScroll2 =
      //     sliderCategoryWidth * categories.length -
      //     window.innerWidth -
      //     80 * categories.length;

      //   const tl3 = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: "#section-3",
      //       pin: "#section-3",
      //       scrub: 4,
      //       pinSpacing: true,
      //       end: "+=" + amountOfScroll2,
      //     },
      //   });
      //   tl3.to(".slider-category", {
      //     x: -amountOfScroll2,
      //     ease: "none",
      //   });

      //   categories.forEach((category) => {
      //     const text = category.querySelectorAll(".category-name");

      //     gsap.to(text, {
      //       scale: 2,
      //       ease: "none",
      //       stagger: 0.1,
      //       scrollTrigger: {
      //         trigger: category,
      //         containerAnimation: tl3,
      //         start: "top top",
      //         end: "center center",
      //         scrub: 2,
      //       },
      //     });
      //   });
    },

    { dependencies: [eventsResponse], revertOnUpdate: true }
  );

  return (
    <>
      <div id="slider" className="flex gap-[20px] w-max relative z-10">
        {eventsResponse?.events.map((event: EventType) => (
          <SliderCard
            key={event.id}
            event={event}
            setModalOpen={setModalOpen ?? setInternalOpen}
            setEvent={setEvent ?? setInternalEvent}
          />
        ))}
      </div>

      <p
        id="upcoming"
        className="absolute left-[10%] bottom-0 4xl:bottom-[5%] z-0 text-white text-[20rem] font-bold opacity-20 whitespace-nowrap max-w-[80%] leading-none pointer-events-none select-none"
      >
        {label}
      </p>
    </>
  );
};

export default Slider;
