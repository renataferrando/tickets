/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import prisma from "@/lib/db";

import { getEvents } from "@/lib/getEventsDb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function GET(req: NextRequest) {
  const session = await getSession(req, new NextResponse());
  if (!session) {
    const loginUrl = new URL("/api/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const url = new URL(req.url);

  const params = {
    name: url.searchParams.get("name"),
    location: url.searchParams.get("location"),
    description: url.searchParams.get("description"),
    startDate: url.searchParams.get("start_date"),
    endDate: url.searchParams.get("end_date"),
    ticketStatus: url.searchParams.get("ticket_status"),
    ticketType: url.searchParams.get("ticket_type"),
    sortBy: url.searchParams.get("sort_by") || "date",
    sortOrder: url.searchParams.get("sort_order") || "asc",
    page: parseInt(url.searchParams.get("page") || "1", 10),
    limit: parseInt(url.searchParams.get("limit") || "10", 10),
  };

  try {
    const data = await getEvents(params);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
});

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const newEvent = await prisma.event.create({
//       data: body,
//     });

//     return NextResponse.json(
//       { message: "Event created successfully", event: newEvent },
//       { status: 201 }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         {
//           message: error.message,
//         },
//         {
//           status: 500,
//         }
//       );
//     }
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Insert events first (without tickets)
    const events = body.map(({ tickets, ...eventData }) => eventData); // Remove tickets
    const createdEvents = await prisma.event.createMany({
      data: events,
      skipDuplicates: true,
    });

    // Fetch event IDs of the newly inserted events
    const insertedEvents = await prisma.event.findMany({
      where: { name: { in: events.map((e) => e.name) } }, // Assuming `name` is unique
    });

    // Insert tickets
    const ticketsData = body.flatMap((event) => {
      const eventId = insertedEvents.find((e) => e.name === event.name)?.id;
      if (!eventId) return [];
      return event.tickets.create.map((ticket) => ({
        ...ticket,
        eventId,
      }));
    });

    await prisma.ticket.createMany({
      data: ticketsData,
      skipDuplicates: true,
    });

    return NextResponse.json(
      { message: "Events and tickets created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
