
import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useGetProfileQuery } from "@/services/userService.ts";
import { getFirstLetter } from "../../../utils/string-format/index";
import MultiplyIcon from "../../icons/Multiple";
import gsap from "gsap";
import { useAuth0 } from "@auth0/auth0-react";
import NavItems from "./nav-items";

const Sidebar = () => {
  const menu = useRef(null);
  const menuBtn = useRef(null);
  const { isAuthenticated } = useAuth0();

  const { data: profile, isLoading } = useGetProfileQuery(null);

  const {
    given_name: name,
    family_name: lastName,
    nickname,
  } = profile?.user || {};

  const tl = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

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
  }, [profile]);

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
      {isAuthenticated ? (
        <>
          {!isLoading && (
            <>
              <Box
                ref={menuBtn}
                className="border border-[1px] z-20 opacity-60 w-[40px] h-[40px] 4xl:w-[60px] 4xl:h-[60px] mt-4 rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleOpenMenu}
              >
                <div className="flex flex items-center justify-center text-[8px]">
                  <p className="text-sm 4xl:text-[24px]">
                    {getFirstLetter(name || nickname?.toUpperCase() || "")}
                  </p>
                  <p className="text-sm 4xl:text-[24px]">{getFirstLetter(lastName || "")}</p>
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
                <NavItems />
              </div>
            </>
          )}{" "}
        </>
      ) : (
        <button className="mt-4">
          <a className="4xl:text-[24px]" href="/api/auth/login">Log in</a>
        </button>
      )}
    </>
  );
};

export default Sidebar;
