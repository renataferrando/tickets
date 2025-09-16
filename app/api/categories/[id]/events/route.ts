/* eslint-disable */
// @ts-nocheck

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "id is not defined" }), {
      status: 400,
    });
  }

  try {
    const events = await prisma.event.findMany({
      where: {
        categoryId: Number(id),
      },
    });

    return new Response(JSON.stringify(events), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
