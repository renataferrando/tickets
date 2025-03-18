"use client";
import { useState } from "react";
import Slider from "@/app/components/events/slider";
import FullAnimationWrapper from "@/app/components/common/animation-wrapper/full";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { eventsPageAnimations } from "./eventsPageAnimations";
import { useGSAP } from "@gsap/react";
import Categories from "@/app/components/events/categories";

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
  const [scrollActive, setScrollActive] = useState(false);

  useGSAP(() => {
    eventsPageAnimations();
  }, []);

  return (
    // <ReactLenis root options={{ smoothWheel: true }}>
    <div className="wrapper overflow-hidden">
      <FullAnimationWrapper>
        {/* Slider Section */}
        <div
          id="section-1"
          data-bgcolor="bg-sky-800"
          className="section flex h-[100vh] px-20 items-center overflow-hidden"
        >
          <Slider setScrollActive={setScrollActive} />
        </div>
        <Categories scrollActive={scrollActive} />
      </FullAnimationWrapper>
    </div>
    // </ReactLenis>
  );
}
