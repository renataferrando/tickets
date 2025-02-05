"use client";

import { formatDate } from "@/app/utils/string-format/formatDate";
import Button from "../../common/button";
import { EventType } from "@/app/types/event";
import { Divider } from "@mui/material";
// import ImageEffect from "./imageEffect";
import Image from "next/image";

export const EventCard = ({ event, ref }: EventType) => {
  return (
    <div
      ref={ref}
      className="w-[320px] h-[450px] flex-none border border-opacity-20 border-white-200 rounded-lg grid grid-rows-[75%_25%] gap-2 group"
    >
      {/* <ImageEffect imageSrc={event?.imageUrl || ""} /> */}
      <Image
        src={event?.imageUrl || ""}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }} // optional
        alt="Event's image"
      />
      <div className="px-4 py-2">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
          <p className="font-proto-sans text-xs">{formatDate(event.date)}</p>
        </div>
        <Divider className="mb-4 bg-white opacity-20" />
        <div className="grid grid-cols-[50%_50%] items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs">{event.location}</p>
          </div>
          <Button
            className="py-2 px-4 rounded-lg text-sm"
            primary
            text="Buy tickets"
          />
        </div>
      </div>
    </div>
  );
};
