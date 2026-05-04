// src/app/api/admin/faculties/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createFacultySchema } from "@/features/admin/faculties/faculty.schema";

export async function GET() {
  try {
    const { error } = await requireAdmin();

    if (error) return error;

    const faculties = await prisma.faculty.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(
      {
        data: faculties,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[GET_FACULTIES_ERROR]", error);

    return NextResponse.json(
      {
        message: "Error al obtener las facultades",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { error } = await requireAdmin();

    if (error) return error;

    const body = await request.json();

    const result = createFacultySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Datos inválidos",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { code, name, description } = result.data;

    const faculty = await prisma.faculty.create({
      data: {
        code: code.toUpperCase(),
        name,
        description: description || null,
      },
    });

    return NextResponse.json(
      {
        message: "Facultad creada correctamente",
        data: faculty,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[CREATE_FACULTY_ERROR]", error);

    const prismaError = error as { code?: string };

    if (prismaError.code === "P2002") {
      return NextResponse.json(
        {
          message: "Ya existe una facultad con ese código",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        message: "Error al crear la facultad",
      },
      { status: 500 },
    );
  }
}
