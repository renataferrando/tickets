import gsap from "gsap";
import { RefObject } from "react";

const homeAnimations = (ticketRef: RefObject<HTMLDivElement>) => {
  if (!ticketRef.current) return () => {};
  const ctx = gsap.context(() => {
    // Start the animation after a 3-second delay
    gsap.fromTo(
      ticketRef.current,
      {
        y: -50, // Start above
        rotate: -50, // Slight tilt
        scale: 0.8, // Smaller size
        opacity: 0, // Invisible initially
      },
      {
        y: 0, // Drop into place
        rotate: 0, // Level out
        scale: 1, // Full size
        opacity: 1, // Fade in
        duration: 1.8, // Smooth duration
        ease: "elastic.out(1, 0.5)", // Bounce effect
        delay: 0, // 3-second delay before starting
      }
    );

    // Smooth floating animation after showing up
    gsap.to(ticketRef.current, {
      y: 0.4, // Float up and down
      duration: 1.5,
      yoyo: true,
      repeat: -1, // Infinite loop
      ease: "power1.inOut",
      delay: 0, // Start floating after the initial delay
    });
  });

  return () => ctx.revert(); // Clean up GSAP context on component unmount
};
export default homeAnimations;
