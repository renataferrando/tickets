import Image from "next/image";

import { Divider } from "@mui/material";
import Button from "../../../common/button";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { EventType } from "@/app/types/event";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  event: EventType;
  setModalOpen?: (open: boolean) => void;
  setEvent?: (event: EventType) => void;
}
type ClassInput = string | false | null | undefined | Record<string, boolean>;
const cn = (...x: ClassInput[]) => twMerge(clsx(x));

const SliderCard = ({ event, setModalOpen, setEvent, ...rest }: Props) => {
  const cardClass = cn(
    // layout
    "item grid grid-rows-[68%_30%] gap-2 flex-none group",
    // size
    "w-[300px] h-[450px] 2xl:w-[380px] 2xl:h-[550px] 4xl:w-[500px] 4xl:h-[700px]",
    // visuals
    "rounded-lg border border-white/20",
    // bg (kept as arbitrary value)
    "bg-[oklch(20.8%_0.042_265.755_/_0.3)]",

    rest.className
  );

  const date = moment.utc(event.date).format("MMMM Do YYYY");
  return (
    <div key={event.id} className={cardClass} {...rest}>
      <Image
        className="image-event rounded-t-lg"
        src={event.imageUrl || "/"}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
        alt="Event's image"
      />
      <div className="p-2 2xl:p-4 flex flex-col justify-between">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-lg 2xl:text-xl 4xl:text-4xl font-semibold mb-2 max-w-[50%] line-clamp-2 overflow-hidden h-[3.2rem] 2xl:h-[3.6rem] 4xl:h-[5rem]">
            {event.name}
          </h2>
          <p className="font-proto-sans text-xs 4xl:text-xl">{date}</p>
        </div>
        <Divider className="mb-4 bg-white opacity-20" />
        <div className="grid grid-cols-[45%_10%_45%] items-center w-full justify-between h-10 2xl:h-12 4xl:h-16">
          <div className="flex items-center gap-2 overflow-hidden">
            <p className="text-xs 4xl:text-2xl truncate">{event.location}</p>
          </div>
          <KeyboardArrowDownRoundedIcon
            sx={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24",
              fontSize: 16,
            }}
            className="cursor-pointer"
            onClick={() => {
              setModalOpen?.(true);
              setEvent?.(event);
            }}
          />
          <Button
            onClick={() => console.log("hola")}
            id="button"
            roundedNormal
            primary
            lg
            text="Buy tickets"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
