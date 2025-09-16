"use client";

import { useRef, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { createPortal } from "react-dom";

interface SidebarWrapperProps {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
}

const SidebarWrapper = ({ triggerContent, children }: SidebarWrapperProps) => {
  const menu = useRef<HTMLDivElement | null>(null);
  const menuBtn = useRef<HTMLDivElement | null>(null);
  const backdrop = useRef<HTMLDivElement | null>(null);
  const tl = useRef(
    gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        if (backdrop.current) {
          gsap.set(backdrop.current, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        }
      },
    })
  );

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        if (backdrop.current) {
          gsap.set(backdrop.current, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        }
      },
    });

    tl.current
      .to(
        menuBtn.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0
      )
      .to(
        backdrop.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          onStart: () => {
            if (backdrop.current) {
              gsap.set(backdrop.current, {
                visibility: "visible",
                pointerEvents: "auto",
              });
            }
          },
        },
        0
      )
      .to(
        menu.current,
        {
          opacity: 0.95,
          visibility: "visible",
          right: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      .reverse();
  }, []);

  const handleOpenMenu = () => {
    if (!tl.current.isActive()) {
      tl.current.timeScale(1).play();
    }
  };

  const handleCloseMenu = () => {
    if (!tl.current.isActive()) {
      tl.current.timeScale(2).reverse();
    }
  };

  return (
    <>
      <Box
        ref={menuBtn}
        className="border border-[1px] opacity-60 w-[40px] z-50 h-[40px] 4xl:w-[60px] 4xl:h-[60px] mt-4 rounded-full flex items-center justify-center cursor-pointer"
        onClick={handleOpenMenu}
      >
        <div className="flex items-center justify-center text-[8px]">
          {triggerContent}
        </div>
      </Box>
      {typeof document !== "undefined"
        ? createPortal(
            <>
              <div
                ref={backdrop}
                onClick={handleCloseMenu}
                className="fixed inset-0  backdrop-blur opacity-0 invisible pointer-events-none z-[1195]"
              />
              <div
                ref={menu}
                className="fixed top-0 right-[-50%] h-screen w-[50%] bg-cyan-900 opacity-0 z-[1200]"
              >
                <div className="flex max-h-[70px] p-2 cursor-pointer mt-8 justify-end px-10">
                  <CloseRoundedIcon
                    sx={{
                      fontVariationSettings:
                        "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24",
                      fontSize: 24,
                    }}
                    className="cursor-pointer"
                    onClick={handleCloseMenu}
                  />
                </div>

                <div className="p-6 h-[calc(100%-70px)] overflow-y-auto">
                  {children}
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </>
  );
};

export default SidebarWrapper;
