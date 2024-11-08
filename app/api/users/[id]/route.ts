import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const note = await prisma.user.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!note)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    return NextResponse.json(note);
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

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: body,
  });
  return NextResponse.json({ message: "User updated " });
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deleteUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(deleteUser);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Note not found",
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
