"use client";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPinned, HandCoins } from "lucide-react";
import { EventType } from "@/app/types/event";
import Badge from "../badge";
import moment from "moment";
import Button from "../button";
import ClampText from "../clamp-text";

const EventPreviewModal = ({
  open,
  event,
  handleClose,
}: {
  open: boolean;
  event: EventType | null;
  handleClose: () => void;
}) => {
  const modalVariants = {
    visible: {
      opacity: 1,
      transition: { delay: 0.2, when: "beforeChildren" },
    },
    hidden: { opacity: 0, transition: { when: "afterChildren" } },
  };

  const date = moment.utc(event?.date).format("MMMM Do YYYY");
  const time = moment.utc(event?.date).format("HH:mm");

  type TicketLike = { price?: unknown; status?: unknown };
  function getTicketPriceRangeString(
    tickets: unknown,
    { onlyAvailable = false }: { onlyAvailable?: boolean } = {}
  ) {
    let min = Infinity;
    let max = -Infinity;

    const list: TicketLike[] = Array.isArray(tickets)
      ? (tickets as TicketLike[])
      : [];

    for (const t of list) {
      const status = typeof t?.status === "string" ? t.status : undefined;
      if (onlyAvailable && status !== "available") continue;
      const priceNum = Number(t?.price);
      if (Number.isFinite(priceNum)) {
        if (priceNum < min) min = priceNum;
        if (priceNum > max) max = priceNum;
      }
    }

    if (min === Infinity) return "-";
    return min === max ? String(min) : `${min}-${max}`;
  }

  console.log(event);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const portalContent = (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {open && event && (
        <motion.div
          onClick={handleClose}
          data-lenis-prevent
          className="fixed inset-0 z-[1100] flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          />
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative z-[1101]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-[700px] h-[550px] max-w-[90vw] max-h-[100vh] bg-white rounded-lg shadow-xl">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="https://res.cloudinary.com/dtvkdwnoa/image/upload/f_auto,q_auto,w_1400,dpr_auto,c_fill,g_auto/v1757959419/bg-event-modal_xprhpy.jpg"
                  alt=""
                  fill
                  priority={open}
                  sizes="(max-width: 768px) 90vw, 700px"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-rows-[40%_60%] h-full z-100 relative">
                <div className="relative w-full h-full overflow-hidden rounded-t-lg">
                  <Image
                    src={event.imageUrl || "/"}
                    alt={event.name}
                    fill
                    sizes="100vw"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-8 p-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-2xl mb-2 font-bold text-gray-800">
                        {event.name}
                      </h3>
                      <ClampText
                        className="text-gray-500"
                        text={event.description}
                        lines={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className="bg-[oklch(39.8%_0.195_277.366/_0.22)] text-violet-900"
                        icon={<Calendar className="size-4" />}
                        text={date}
                      />
                      <Badge
                        className="bg-[oklch(39.8%_0.195_277.366/_0.22)] text-violet-900"
                        icon={<Clock className="size-4" />}
                        text={time}
                      />
                      <Badge
                        className="bg-[oklch(39.8%_0.195_277.366/_0.22)] text-violet-900"
                        icon={<MapPinned className="size-4" />}
                        text={event.location}
                      />
                      <Badge
                        className="bg-[oklch(39.8%_0.195_277.366/_0.22)] text-violet-900"
                        icon={<HandCoins className="size-4" />}
                        text={getTicketPriceRangeString(event.tickets)}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-fit"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return mounted && typeof document !== "undefined"
    ? createPortal(portalContent, document.body)
    : null;
};

export default EventPreviewModal;
