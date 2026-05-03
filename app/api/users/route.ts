import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, name: "Nerio" },
    { id: 2, name: "Juan" },
  ]);
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    message: "User created",
    user: body,
  });
}
