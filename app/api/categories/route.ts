import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const GET = withApiAuthRequired(async function GET(req: NextRequest) {
  const session = await getSession(req, new NextResponse());
  if (!session) {
    const loginUrl = new URL("/api/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        events: {
          some: {},
        },
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch cagtegories" },
        { status: 500 }
      );
    }
  }
});
