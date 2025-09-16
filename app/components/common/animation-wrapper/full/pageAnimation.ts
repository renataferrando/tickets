import gsap from "gsap";
// import SplitType from "split-type";

export const animatePageIn = () => {
  document.body.style.overflow = "hidden";
  // const text = new SplitType(".text");

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = "auto";
    },
  });
  tl.from("#banner-1", {
    yPercent: 0,
  })

    .to(".text", {
      opacity: 1,
    })
    .to(
      ".char",
      {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.1,
      },
      1
    )
    .to(
      ".text",
      {
        visibility: "hidden",
      },
      2
    )

    .to(
      "#banner-1",
      {
        yPercent: -100,
        duration: 1,
      },
      2
    );
};
