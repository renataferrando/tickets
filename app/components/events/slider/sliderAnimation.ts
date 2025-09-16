import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const sliderAnimation = (amountOfScroll: number) => {
  // Clear any previous slider-related triggers
  ScrollTrigger.getAll().forEach((t) => {
    const trigger = t.trigger as Element | null;
    if (trigger && (trigger as HTMLElement).id === "section-1") {
      t.kill();
    }
  });

  if (amountOfScroll <= 0) {
    // Nothing to scroll: ensure slider is at start and avoid pinning
    gsap.set("#slider", { x: 0 });
  } else {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        pin: true,
        pinReparent: true,
        anticipatePin: 2,
        pinSpacing: true,
        start: 0,
        scrub: 1,
        end: "+=" + amountOfScroll,
        invalidateOnRefresh: true,
      },
    });
    tl.to("#slider", {
      x: -amountOfScroll,
      ease: "none",
    });
  }

  gsap.to("#upcoming", {
    scale: 2,
    scrollTrigger: {
      trigger: "#upcoming",
      scrub: 2,
      start: "left center",
    },
  });
};
