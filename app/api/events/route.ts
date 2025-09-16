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

export const POST = withApiAuthRequired(async function POST(req: NextRequest) {
  try {
    const session = await getSession(req, new NextResponse());
    if (!session) {
      const loginUrl = new URL("/api/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    const body = await req.json();
    const {
      tickets = [],
      organizerId,
      categoryId,
      category, // optional fallback by name
      name,
      date,
      location,
      description,
      imageUrl,
    } = body;

    if (!name || !date || !location || !description || !organizerId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let resolvedCategoryId = categoryId;
    if (!resolvedCategoryId && category) {
      const found = await prisma.category.findFirst({
        where: { name: category },
      });
      if (!found) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 400 }
        );
      }
      resolvedCategoryId = found.id;
    }
    if (!resolvedCategoryId) {
      return NextResponse.json(
        { message: "categoryId is required" },
        { status: 400 }
      );
    }

    const normalizedTickets = Array.isArray(tickets)
      ? tickets.map((t: any) => ({
          price: Number(t.price),
          type: String(t.type),
          status: String(t.status ?? "available"),
          stock: Number(t.stock ?? 0),
          description: t.description ? String(t.description) : null,
        }))
      : [];

    const created = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        location,
        description,
        imageUrl,
        organizer: { connect: { id: Number(organizerId) } },
        category: { connect: { id: Number(resolvedCategoryId) } },
        tickets: { create: normalizedTickets },
      },
      include: { organizer: true, category: true, tickets: true },
    });

    return NextResponse.json(
      { message: "Event created", event: created },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
