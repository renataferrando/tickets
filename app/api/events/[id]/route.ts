import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!event)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });

    return NextResponse.json(event);
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

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = params;
  const body = await req.json();

  await prisma.event.update({
    where: {
      id: Number(id),
    },
    data: body,
  });
  return NextResponse.json({ message: "Event updated " });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const deleteEvent = await prisma.event.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deleteEvent)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });

    return NextResponse.json(deleteEvent);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Event not found",
          },
          {
            status: 404,
          }
        );
      }

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
