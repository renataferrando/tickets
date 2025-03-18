import Image from "next/image";

import { Divider } from "@mui/material";
import { formatDate } from "@/app/utils/string-format/formatDate";
import Button from "../../../common/button";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  imageUrl?: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

const SliderCard = ({ event, ...rest }: Props) => {
  return (
    <div
      key={event.id} 
      className="item z-10 bg-slate-400 bg-opacity-30 w-[320px] h-[450px] 4xl:w-[500px] 4xl:h-[700px] flex-none border border-opacity-20 border-white-200 rounded-lg grid grid-rows-[75%_25%] gap-2 group"
      {...rest}
    >
      <Image
        className="image-event rounded-t-lg"
        src={event.imageUrl || ""}
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
      <div className="px-4 py-2">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-xl 4xl:text-4xl font-semibold mb-2 whitespace-nowrap truncate">{event.name}</h2>
          <p className="font-proto-sans text-xs 4xl:text-xl">{formatDate(event.date)}</p>
        </div>
        <Divider className="mb-4 bg-white opacity-20" />
        <div className="grid grid-cols-[50%_50%] items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs 4xl:text-2xl">{event.location}</p>
          </div>
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