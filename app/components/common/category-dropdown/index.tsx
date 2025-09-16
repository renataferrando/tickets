"use client";

import { useGetCategoriesQuery } from "@/services/categoryService";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const CategoryDropdown = () => {
  const { data: categories } = useGetCategoriesQuery(null);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const hrRef = useRef<HTMLHRElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Downward caret: 3 dots, 2 dots, 1 dot
  const arrowPattern = useMemo(() => ["•••", ".••", "..•"], []); // down arrow

  useEffect(() => {
    if (!triggerRef.current || !hrRef.current || !gridRef.current) return;

    const applyArrowPattern = () => {
      const grid = gridRef.current!;
      const cells = grid.querySelectorAll<HTMLSpanElement>("span");
      for (let r = 0; r < arrowPattern.length; r += 1) {
        const row = arrowPattern[r];
        for (let c = 0; c < 3; c += 1) {
          const i = r * 3 + c;
          const isDot = row[c] === "•";
          const cell = cells[i];
          if (!cell) continue;
          cell.textContent = isDot ? "•" : "\u00A0";
          cell.style.opacity = isDot ? "1" : "0";
        }
      }
    };

    const rotateAndExpand = () => {
      const tl = gsap.timeline();
      const grid = gridRef.current!;
      const cells = grid.querySelectorAll<HTMLSpanElement>("span");
      tl.to(
        hrRef.current,
        { width: "100%", duration: 0.4, ease: "power2.out" },
        0
      );
      tl.to(
        cells,
        { opacity: 0, duration: 0.12, stagger: 0.01, ease: "power1.out" },
        0
      );
      tl.add(() => applyArrowPattern());
      tl.set(cells, { y: -6 });
      const arrowCells = Array.from(
        grid.querySelectorAll<HTMLSpanElement>("span")
      ).filter((el) => el.textContent === "•");
      tl.to(
        arrowCells,
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.01, ease: "power2.out" },
        ">-0.05"
      );
    };

    const resetAnimation = () => {
      const tl = gsap.timeline();
      const cells = gridRef.current!.querySelectorAll<HTMLSpanElement>("span");
      tl.to(
        hrRef.current,
        { width: "0%", duration: 0.4, ease: "power2.out" },
        0
      );
      tl.to(
        cells,
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.01, ease: "power1.out" },
        0
      );
    };

    const node = triggerRef.current;
    node.addEventListener("mouseenter", rotateAndExpand);
    node.addEventListener("mouseleave", resetAnimation);
    return () => {
      node.removeEventListener("mouseenter", rotateAndExpand);
      node.removeEventListener("mouseleave", resetAnimation);
    };
  }, [arrowPattern]);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!open) return;
      const root = rootRef.current;
      const target = e.target as Node | null;
      if (root && target && !root.contains(target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener(
      "touchstart",
      handlePointerDown as EventListener,
      { passive: true } as AddEventListenerOptions
    );
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener(
        "touchstart",
        handlePointerDown as EventListener
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex flex-col max-w-[45%] ">
      <hr ref={hrRef} className="border-none h-[0.5px] bg-white opacity-70" />
      <div
        ref={triggerRef}
        className="flex gap-6 mt-3 justify-between px-6 cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
      >
        <p className="font-normal 4xl:text-[24px]">Categories</p>
        <div
          ref={gridRef}
          className="grid grid-cols-3 grid-rows-3 self-center gap-x-2"
        >
          {arrowPattern.map((row, rowIndex) =>
            row.split("").map((cell, colIndex) => (
              <span
                key={`${rowIndex}-${colIndex}`}
                className="text-[6px] 4xl:text-[8px]"
              >
                {cell === "•" ? "•" : "\u00A0"}
              </span>
            ))
          )}
        </div>
      </div>

      {open && (
        <div className="absolute left-0 mt-2 w-48 max-h-72 overflow-auto bg-white/10 backdrop-blur border border-white/20 rounded shadow-lg z-50">
          <ul className="py-1">
            {categories?.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/events/category/${cat.id}`}
                  className="block px-3 py-2 text-sm text-white hover:bg-white/20"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
