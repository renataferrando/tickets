/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status"); // Optional filter by status
  const eventId = url.searchParams.get("eventId");
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(eventId ? { eventId: Number(eventId) } : {}),
      },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch tickets" },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { eventId, type, price, quantity, stock } = await req.json();

    // Pre-generate tickets
    const ticketsData = Array.from({ length: quantity }).map(() => ({
      eventId,
      type,
      price,
      stock,
      status: "available", // Default status
    }));

    const newTickets = await prisma.ticket.createMany({
      data: ticketsData,
    });

    return NextResponse.json(
      { message: `${quantity} tickets created successfully` },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { ticketIds, action } = await req.json(); // `action` can be "reserve", "sell", or "reset"

    // Validar acción permitida
    if (!["reserve", "sell", "reset"].includes(action)) {
      return NextResponse.json(
        { message: "Invalid action. Use 'reserve', 'sell', or 'reset'." },
        { status: 400 }
      );
    }

    // Determinar el nuevo estado basado en la acción
    let status;
    if (action === "reserve") status = "reserved";
    else if (action === "sell") status = "sold";
    else if (action === "reset") status = "available"; // Nueva acción

    // Actualizar el estado de los tickets
    const updatedTickets = await prisma.ticket.updateMany({
      where: {
        id: { in: ticketIds },
        status: action === "reset" ? undefined : "available", // Solo modificamos los disponibles, excepto en reset
      },
      data: { status },
    });

    // Verificar si todos los tickets se actualizaron correctamente
    if (updatedTickets.count !== ticketIds.length) {
      return NextResponse.json(
        {
          message:
            "Some tickets were not updated. Ensure tickets match the required status.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: `Tickets successfully marked as ${status}.` },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
