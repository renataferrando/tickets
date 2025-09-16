"use client";

import { useEffect } from "react";
import { useGetProfileQuery } from "@/services/userService";
import { getFirstLetter } from "../../../utils/string-format/index";
import { useAuth0 } from "@auth0/auth0-react";
import NavItems from "./nav-items";
import { getToken } from "@/app/helpers/security";
import SidebarWrapper from "./SidebarWrapper";

const Sidebar = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { data: profile, isLoading } = useGetProfileQuery(null);
  const {
    given_name: name,
    family_name: lastName,
    nickname,
  } = profile?.user || {};

  useEffect(() => {
    if (isAuthenticated) {
      getToken.setAccessTokenSilently(getAccessTokenSilently);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return (
      <button className="mt-4">
        <a className="4xl:text-[24px]" href="/api/auth/login">
          Log in
        </a>
      </button>
    );
  }

  if (isLoading) return null;

  return (
    <SidebarWrapper
      triggerContent={
        <>
          <p className="text-sm 4xl:text-[24px]">
            {getFirstLetter(name || nickname?.toUpperCase() || "")}
          </p>
          <p className="text-sm 4xl:text-[24px]">
            {getFirstLetter(lastName || "")}
          </p>
        </>
      }
    >
      <NavItems />
    </SidebarWrapper>
  );
};

export default Sidebar;
