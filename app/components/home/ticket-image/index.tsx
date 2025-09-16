/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useLayoutEffect, useRef } from "react";

import ticketImg from "../../../assets/transparent_ticket-removebg.png";
import homeAnimations from "@/app/animations/home/animations";

const TicketImage = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ticketRef.current) return;
    return homeAnimations(ticketRef);
  }, []);
  return (
    <div
      ref={ticketRef}
      className="w-[600px] 3xl:w-[600px] 4xl:w-[900px] h-auto"
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
  );
};

export default TicketImage;
