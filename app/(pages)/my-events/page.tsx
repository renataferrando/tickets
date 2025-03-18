"use client";
import Link from "next/link";
import Page from "@/app/components/common/page";
import { useGetEventsQuery } from "@/services/eventService.ts";
import PageAnimationWrapper from "@/app/components/common/animation-wrapper/bars";

const MyEventsPage = () => {
  const { data: events } = useGetEventsQuery(null, {
    refetchOnMountOrArgChange: true,
  });


  return (
    <PageAnimationWrapper>
      <Page>
        <Link href="/add-event">Add new event</Link>
      </Page>
    </PageAnimationWrapper>
  );
};

export default MyEventsPage;
