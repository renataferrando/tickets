import { useState, useRef, useEffect } from "react";
import { Box, Menu } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetProfileQuery } from "@/services/userService.ts";
import { getFirstLetter } from "../../../utils/string-format/index";
import MultiplyIcon from "../../icons/Multiple";
import gsap from "gsap";

const UserButton = () => {
  const { user, logout } = useAuth0();
  const menu = useRef(null);
  const menuBtn = useRef(null);
  const closeBtn = useRef(null);

  const { data: profile } = useGetProfileQuery(null);
  const { given_name: name, family_name: lastName } = profile || {};

  const tl = useRef(gsap.timeline({ paused: true }));

  const setupAnimation = () => {
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
        menu.current,
        {
          opacity: 0.9,
          visibility: "visible",
          right: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )

      .reverse();
  };
  if (!tl.current.isActive()) {
    setupAnimation();
  }

  const handleOpenMenu = () => {
    tl.current.timeScale(1).play();
  };

  const handleCloseMenu = () => {
    tl.current.timeScale(2).reverse();
  };
  return (
    <>
      {user ? (
        <>
          <Box
            ref={menuBtn}
            className="border border-[1px] z-20 opacity-60 w-[40px] h-[40px] mt-4 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleOpenMenu}
          >
            <div className="flex flex items-center justify-center text-[8px]">
              <p className="text-sm">{getFirstLetter(name)}</p>
              <p className="text-sm">{getFirstLetter(lastName)}</p>
              {/* <UserIcon className="size-5 font-semibold" /> */}
            </div>
          </Box>
          <div
            ref={menu}
            className="w-[50%] z-10 bg-cyan-900 opacity-0 right-[-50%] top-0 h-full absolute"
          >
            <div className="flex max-h-[70px] p-2 cursor-pointer">
              <MultiplyIcon
                color="#fff"
                strokeWidth="0.5"
                className="relative left-[40%]"
                onClick={handleCloseMenu}
              />
            </div>
            <div className="flex flex-col h-[70%] w-full pl-20 justify-center gap-8">
              <Box className="flex items-center gap-4 cursor-pointer">
                <span className="text-xs font-semibold">01.</span>
                <p className="text-4xl">My account</p>
              </Box>
              <Box className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-semibold">02.</span>
                <p className="text-4xl">Orders</p>
              </Box>
              <Box
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                <span className="text-xs font-semibold">03.</span>
                <p className="text-4xl">Log out</p>
              </Box>
            </div>
          </div>
        </>
      ) : (
        <button className="mt-4">
          <a href="/api/auth/login">Log in</a>
        </button>
      )}
    </>
  );
};

export default UserButton;
