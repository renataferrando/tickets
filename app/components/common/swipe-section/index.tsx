"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollToPlugin from "gsap-trial/ScrollToPlugin";
import Slider from "../../events/slider";
import { useGSAP } from "@gsap/react";

const SwipeSection = ({ text }) => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const textRefs = useRef([]);
  const currentIndex = useRef(0);
  const slidersl = useRef(null);
  gsap.registerPlugin(ScrollToPlugin);
  useGSAP(
    () => {
      // gsap code here...
      gsap.to(window, {
        scrollTo: { y: 1000, autoKill: false },
        duration: 1,
        // onComplete: () => (scrollTween = null),
        overwrite: true,
      });
    },
    { scope: sectionRef }
  ); // <-- scope is for selector text (optional)

  return (
    <div ref={sectionRef}>
      {/* First Panel */}
      <div
        // ref={(el) => (panelsRef.current[0] = el)}
        className="swipe-section h-[100vh] px-20 flex items-center justify-center bg-black relative overflow-hidden"
      >
        <section className="panel absolute">
          <p
            className="text-[9em]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            {text}
          </p>
        </section>
      </div>

      {/* Second Panel with Slider */}
      <div
        ref={slidersl}
        className="swipe-section h-[100vh] px-20 flex items-center justify-center bg-sky-900 relative overflow-hidden"
      >
        <section className="panel absolute">
          <Slider />
        </section>
      </div>
    </div>
  );
};

export default SwipeSection;
