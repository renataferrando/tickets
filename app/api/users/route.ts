"use server";

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
};


export async function POST(req: NextRequest) {
  const body = await req.json();
  await prisma.user.create({
    data: body
  })
  return NextResponse.json({ message: "User created successfully"})
};
