import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const afterCallback = async (req: NextRequest,  session: Session, state: unknown) => {
  const {
    email,
    given_name: name,
    family_name: lastName,
    sub: auth0Id,
  } = session.user;
  await prisma.user.upsert({
    where: { auth0Id },
    update: {
      name,
      email,
      lastName,
    },
    create: {
      auth0Id,
      name,
      lastName,
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
      console.log(error);
    }
  },
});
