import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({ id: params.id, name: "User" });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  return NextResponse.json({
    message: "User updated",
    id: params.id,
    data: body,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({
    message: "User deleted",
    id: params.id,
  });
}
