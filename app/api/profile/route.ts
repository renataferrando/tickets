import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const GET = withApiAuthRequired(async function GET(req) {
  const session = await getSession(req, new NextResponse());
  if (!session) {
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }
  const { sub: auth0Id } = session.user;

  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found in the database' }, { status: 404 });
    }
    return NextResponse.json({
      user: {
        ...session.user,
        id: user.id,
      },
    });
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
