/* eslint-disable @typescript-eslint/no-unused-vars */
import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const afterCallback = async (req: NextRequest, session: Session, state: unknown) => {
  const {
    email,
    given_name: name,
    family_name: lastName,
    sub: auth0Id,
  } = session.user;

  await prisma.user.upsert({
    where: { auth0Id },
    update: {
      name: name || "",
      email,
      lastName: lastName || "",
    },
    create: {
      auth0Id,
      name: name || "",
      lastName: lastName || "",
      email,
      createdAt: new Date(),
    },
  });
  return session;
};

export const GET = handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await handleCallback(req, res, { afterCallback });
      return response;
    } catch (error) {
      console.error("Error in callback handler:", error);
      // Return a proper error response
      if (error instanceof Error) {
        return NextResponse.json(
          { error: "Failed to fetch filters", details: error.message },
          { status: 500 }
        );
      }
    }
  },
});
