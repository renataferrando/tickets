"use client";
import { useGetCategoriesQuery } from "@/services/categoryService";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CategoryType } from "@/app/types/category";
import Link from "next/link";

const CategoriesV2 = () => {
  const { data: categories } = useGetCategoriesQuery(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!containerRef.current) return;

      const splits: SplitType[] = [];
      const words = gsap.utils.toArray<HTMLElement>(".category-word");
      const hoverHandlers = new Map<
        HTMLElement,
        { onEnter: () => void; onLeave: () => void }
      >();

      words.forEach((word) => {
        const split = SplitType.create(word, { types: "lines,chars" });
        splits.push(split);

        gsap.from(split.lines, {
          opacity: 0,
          yPercent: 40,
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: word,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        });

        // Per-character hover animation
        const onEnter = () => {
          gsap.to(
            split.chars,

            {
              opacity: 1,
              stagger: 0.05,
              delay: 0.2,
              duration: 0.1,
            }
          );
        };
        const onLeave = () => {
          gsap.to(
            split.chars,

            {
              opacity: 0.8,
              stagger: 0.05,
              delay: 0.2,
              duration: 0.1,
            }
          );
        };

        word.addEventListener("mouseenter", onEnter);
        word.addEventListener("mouseleave", onLeave);
        hoverHandlers.set(word, { onEnter, onLeave });
      });

      return () => {
        hoverHandlers.forEach((handlers, word) => {
          word.removeEventListener("mouseenter", handlers.onEnter);
          word.removeEventListener("mouseleave", handlers.onLeave);
        });
        hoverHandlers.clear();
        splits.forEach((s) => s.revert());
      };
    },
    { scope: containerRef, dependencies: [categories] }
  );
  const categoryList: CategoryType[] = categories ?? [];

  return (
    <div className="">
      <div
        ref={containerRef}
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        {categoryList.map((category: CategoryType) => (
          <div
            className="category-word flex flex-col items-center justify-center text-[10em] font-semibold opacity-[.80] cursor-pointer"
            key={category.id}
          >
            <Link
              href={`/events/category/${category.id}`}
              className="font-normal"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesV2;
