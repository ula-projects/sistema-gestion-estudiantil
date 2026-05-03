import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return {
      error: NextResponse.json({ message: "No autenticado" }, { status: 401 }),
      session: null,
    };
  }

  if (session.user.role !== "ADMIN") {
    return {
      error: NextResponse.json({ message: "No autorizado" }, { status: 403 }),
      session: null,
    };
  }

  return {
    error: null,
    session,
  };
}
