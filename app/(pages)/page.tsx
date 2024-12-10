/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";

import ticketImg from "../assets/transparent_ticket-removebg.png";
import AnimatedButton from "../components/home/animated-button";
import Menu from "../components/home/menu";
import MusicWave from "../components/home/music-wave";
import homeAnimations from "../animations/home/animations";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "@/helpers/security";
import MoreButton from "../components/common/more-btn";
import LinearLoading from "../components/common/linear-loading/LinearLoading";

const Home = () => {
  const ticketRef = useRef(null);

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading: authLoading,
    getAccessTokenSilently,
  } = useAuth0();

  getToken.setAccessTokenSilently(getAccessTokenSilently);

  useEffect(() => {
    homeAnimations(ticketRef);
  }, [authLoading]);

  console.log(authLoading, isAuthenticated);

  const PageContent = () => {
    return (
      <div className="h-[100vh] w-full flex flex-col justify-between pb-10 px-10">
        <div className="w-full flex justify-between items-center pt-6">
          <Menu />
          <MoreButton />
        </div>
        <div className="grid grid-cols-[1fr_1fr] items-center px-24">
          <div className="flex flex-col items-center">
            <div>
              <p className="text-[7rem] 2xl:text-[9em] font-semibold">
                FO
                <br />
                MO?
              </p>
              <AnimatedButton />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
              ref={ticketRef}
              className="w-[500px] 2xl:w-[650px] h-auto"
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
            <p className="font-normal text-sm 2xl:text-[16px]">
              Don't miss out! Dive into unforgettable moments and unique
              experiences with our events
            </p>
          </div>
        </div>
      </div>
    );
  };

  return <>{!authLoading ? <PageContent /> : <LinearLoading />}</>;
};

export default Home;
