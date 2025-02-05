import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const {
      name,
      date,
      location,
      description,
      category,
      imageUrl,
      organizerId,
    } = await request.json();

    if (
      !name ||
      !date ||
      !location ||
      !description ||
      !category ||
      !organizerId
    ) {
      return NextResponse.json(
        { message: "All fields except imageUrl are required" },
        { status: 400 }
      );
    }

    // Create the event in the database
    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        location,
        description,
        category,
        imageUrl,
        organizerId,
      },
    });

    return NextResponse.json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error },
      { status: 500 }
    );
  }
}
