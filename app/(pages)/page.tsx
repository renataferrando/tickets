/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import Page from "../components/common/page";
import ticketImg from "../assets/transparent_ticket-removebg.png";
import AnimatedButton from "../components/home/animated-button";
import Menu from "../components/home/menu";
import MusicWave from "../components/home/music-wave";
import homeAnimations from "../animations/home/animations";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "@/app/helpers/security";
import LinearLoading from "../components/common/linear-loading/LinearLoading";
import { useAuthHandler } from "@/app/hooks/useAuthHandler";
import Sidebar from "../components/common/sidebar";

const Home = () => {
  const { logout } = useAuth0();
  const ticketRef = useRef(null);
  const {
    isAuthenticated,
    isLoading: authLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const { handleSilentAuthError } = useAuthHandler();

  useEffect(() => {
    if (isAuthenticated) {
      getToken.setAccessTokenSilently(getAccessTokenSilently);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    homeAnimations(ticketRef);
    handleSilentAuthError();
  }, [authLoading, isAuthenticated, handleSilentAuthError]);

  const PageContent = () => {
    return (
      <Page className={"w-full pb-10 px-10 bg-hero-pattern overflow-hidden"}>
        <div className="grid grid-rows-[auto_1fr] h-[100vh]">
          <div className="w-full flex justify-between items-center pt-6">
            <Menu />
            <Sidebar />
          </div>
          <div className="flex flex-col h-full justify-center gap-4">
            <div className="grid grid-cols-[1fr_1fr] items-center px-24">
              <div className="flex flex-col items-center">
                <div>
                  <p className="text-[6em] 3xl:text-[7em] 4xl:text-[12em] font-semibold">
                    FO
                    <br />
                    MO?
                  </p>
                  <AnimatedButton />
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div
                  ref={ticketRef}
                  className="w-[400px] 3xl:w-[600px] 4xl:w-[800px] h-auto"
                  style={{
                    filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.3))",
                    opacity: 0,
                  }}
                >
                  <img
                    src={ticketImg.src}
                    alt="Event Ticket"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className=" flex w-full justify-between items-center">
              <MusicWave />
              <div className="max-w-[400px]">
                <p className="font-normal text-sm 2xl:text-[16px] 4xl:text-[24px] 4xl:leading-9">
                  Don&lsquo;t miss out! Dive into unforgettable moments and
                  unique experiences with our events...
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  };

  return (
    <>
      {!authLoading ? (
        <PageContent />
      ) : (
        <LinearLoading className={"bg-hero-pattern"} />
      )}
    </>
  );
};

export default Home;
