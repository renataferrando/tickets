import Menu from "@/app/components/home/menu";
import { ReactLenis } from "lenis/react";
import CategoriesV2 from "@/app/components/events/categoriesv2";
import Page from "@/app/components/common/page";
import { getEvents } from "@/lib/getEventsDb";
import Navbar from "@/app/components/common/navbar";

import SliderSection from "@/app/components/events/slider-section";

export default async function EventsPage() {
  const initialEvents = await getEvents({
    page: 1,
    limit: 20,
    sortBy: "date",
    sortOrder: "asc",
  });
  return (
    <Page className="overflow-hidden" id="events-page">
      <ReactLenis root>
        <Navbar left={<Menu text="Home" link="/" />} right={<></>} />

        <SliderSection initialEvents={initialEvents} />
        <div className="h-[15vh]" />
        <CategoriesV2 />
      </ReactLenis>
    </Page>
  );
}
