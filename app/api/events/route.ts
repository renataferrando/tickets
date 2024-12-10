import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  const name = url.searchParams.get("name");
  const location = url.searchParams.get("location");
  const description = url.searchParams.get("description");
  const startDate = url.searchParams.get("start_date");
  const endDate = url.searchParams.get("end_date");
  const ticketStatus = url.searchParams.get("ticket_status");
  const ticketType = url.searchParams.get("ticket_type");

  // Sorting parameters
  const sortBy = url.searchParams.get("sort_by") || "date"; 
  const sortOrder = url.searchParams.get("sort_order") || "asc";

  // Pagination parameters
  const page = parseInt(url.searchParams.get("page") || "1", 10); 
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;


  const filters: unknown = {
    ...(name && { name: { contains: name, mode: "insensitive" } }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
    ...(description && {
      description: { contains: description, mode: "insensitive" },
    }),
    ...(startDate || endDate
      ? {
          date: {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
          },
        }
      : {}),
    ...(ticketStatus || ticketType
      ? {
          tickets: {
            some: {
              ...(ticketStatus && { status: ticketStatus }),
              ...(ticketType && { type: ticketType }),
            },
          },
        }
      : {}),
  };

  try {
    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where: filters,
        include: {
          tickets: true, 
        },
        skip, 
        take: limit, 
        orderBy: { [sortBy]: sortOrder }, 
      }),
      prisma.event.count({
        where: filters, 
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        events,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch events", details: error.message },
        { status: 500 }
      );
    }
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newEvent = await prisma.event.create({
      data: body,
    });
    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
