import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [locations, ticketTypes, ticketStatuses] = await Promise.all([
      prisma.event.findMany({
        select: { location: true },
        distinct: ["location"],
      }),
      prisma.ticket.findMany({
        select: { type: true },
        distinct: ["type"],
      }),
      prisma.ticket.findMany({
        select: { status: true },
        distinct: ["status"],
      }),
    ]);

    const [minDate, maxDate] = await Promise.all([
      prisma.event.findFirst({
        orderBy: { date: "asc" },
        select: { date: true },
      }),
      prisma.event.findFirst({
        orderBy: { date: "desc" },
        select: { date: true },
      }),
    ]);

    const [minPrice, maxPrice] = await Promise.all([
      prisma.ticket.findFirst({
        orderBy: { price: "asc" },
        select: { price: true },
      }),
      prisma.ticket.findFirst({
        orderBy: { price: "desc" },
        select: { price: true },
      }),
    ]);

    const filters = {
      locations: locations.map((item) => item.location),
      ticketTypes: ticketTypes.map((item) => item.type),
      ticketStatuses: ticketStatuses.map((item) => item.status),
      dateRange: {
        minDate: minDate?.date,
        maxDate: maxDate?.date,
      },
      priceRange: {
        minPrice: minPrice?.price,
        maxPrice: maxPrice?.price,
      },
    };

    return NextResponse.json(filters, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch filters", details: error.message },
        { status: 500 }
      );
    }
  }
}
