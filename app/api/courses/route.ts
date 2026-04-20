import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, title: "Math" },
    { id: 2, title: "Physics" },
  ]);
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    message: "Course created",
    course: body,
  });
}
