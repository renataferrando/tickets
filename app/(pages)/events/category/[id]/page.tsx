export const dynamic = "force-dynamic";
import Slider from "@/app/components/events/slider";
import Menu from "@/app/components/home/menu";
import { ReactLenis } from "lenis/react";
import Page from "@/app/components/common/page";
import CategoriesSidebar from "@/app/components/common/sidebar/categories";
import { getEventsByCategory } from "@/lib/getEventsDb";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/common/navbar";
import SliderSection from "@/app/components/events/slider-section";

export default async function EventsByCategory({
  params,
}: {
  params: { id: string };
}) {
  const initialEvents = await getEventsByCategory({
    categoryId: Number(params.id),
    page: 1,
    limit: 20,
    sortBy: "date",
    sortOrder: "asc",
  });

  if (!initialEvents?.events?.length) {
    notFound();
  }

  return (
    <Page
      className="overflow-hidden flex flex-col justify-center"
      id="events-id"
    >
      <ReactLenis root>
        <Navbar
          left={<Menu text="Events" link="/events" />}
          right={<CategoriesSidebar />}
        />
        <div
          id="section-1"
          className="section h-[100vh] flex px-20 items-center overflow-hidden"
        >
          <SliderSection
            initialEvents={initialEvents}
            label={initialEvents.category?.name ?? "EVENTS"}
          />
        </div>
      </ReactLenis>
    </Page>
  );
}
