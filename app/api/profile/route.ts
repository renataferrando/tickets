import { NextResponse } from 'next/server';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

const GET = withApiAuthRequired(async function GET(req) {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  return NextResponse.json({ foo: 'bar', user: user }, user);
});

export { GET };