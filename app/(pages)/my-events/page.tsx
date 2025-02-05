"use client";
import Link from "next/link";
import Page from "@/app/components/common/page";
import { useGetEventsQuery } from "@/services/eventService.ts";

const MyEventsPage = () => {
  const { data: events } = useGetEventsQuery(null, { refetchOnMountOrArgChange: true });

  console.log(events)
  return (
    <Page className="bg-sky-900">
      <Link href="/add-event">Add new event</Link>
    </Page>
  );
};

export default MyEventsPage;
