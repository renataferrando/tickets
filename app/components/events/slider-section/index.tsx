"use client";
import { useRef, useState } from "react";
import Slider from "../slider";
import { EventsResponse } from "@/services/eventService";
import EventPreviewModal from "@/app/components/common/event-preview-modal";
import { EventType } from "@/app/types/event";

const SliderSection = ({
  initialEvents,
  label,
}: {
  initialEvents: EventsResponse;
  label: string;
}) => {
  const sliderSectionRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);
  const handleClose = () => setModalOpen(false);
  return (
    <div
      id="section-1"
      data-bgcolor="bg-sky-800"
      className="section flex h-[100vh] px-20 items-center overflow-hidden"
      ref={sliderSectionRef}
    >
      <Slider
        initialData={initialEvents}
        wrapperRef={sliderSectionRef}
        setModalOpen={setModalOpen}
        setEvent={setEvent}
        label={label}
      />
      <EventPreviewModal
        open={modalOpen}
        handleClose={handleClose}
        event={event}
      />
    </div>
  );
};

export default SliderSection;
