/* eslint-disable @next/next/no-img-element */

import Page from "../components/common/page";
import AnimatedButton from "../components/home/animated-button";
import Menu from "../components/home/menu";
import MusicWave from "../components/home/music-wave";
import Sidebar from "../components/common/sidebar";
import TicketImage from "../components/home/ticket-image";
import Navbar from "../components/common/navbar";
import Link from "next/link";

const Home = () => {
  const PageContent = () => {
    return (
      <Page
        className={
          "overflow-hidden h-[100vh] flex flex-col justify-end items-center"
        }
      >
        <Navbar
          left={<Menu text="Explore events" link="/events" />}
          right={<Sidebar />}
        />
        <div className="grid grid-rows-[auto_1fr]">
          <div className="flex flex-col h-full justify-center gap-4">
            <div className="grid grid-cols-[1fr_1fr] items-center px-24">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <p className="text-[10em] 3xl:text-[12em] 4xl:text-[14em] font-semibold leading-none">
                    FO
                    <br />
                    MO?
                  </p>
                  <Link href="/events" className="w-full">
                    <AnimatedButton />
                  </Link>
                </div>
              </div>
              <div className="flex justify-start items-center">
                {/* <div className="w-[600px] 3xl:w-[600px] 4xl:w-[900px] h-auto">
                  h{" "}
                </div> */}
                <TicketImage />
              </div>
            </div>
            <div className="px-20 pb-10 flex w-full justify-between items-center">
              <MusicWave />
              <div className="max-w-[400px]">
                <p className="font-normal text-sm 2xl:text-[16px] 4xl:text-[24px] 4xl:leading-9">
                  Don&lsquo;t miss out! Dive into unforgettable moments and
                  unique experiences!
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
      {/* {!authLoading ? ( */}
      <PageContent />
      {/* ) : (
        <LinearLoading className={"bg-hero-pattern"} />
      )} */}
    </>
  );
};

export default Home;
