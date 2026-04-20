import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, courseId } = await req.json();

  return NextResponse.json({
    message: "User enrolled",
    userId,
    courseId,
  });
}
