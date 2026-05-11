// src/app/admin/faculties/page.tsx

import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Layers3,
  MapPin,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { prisma } from "@/src/lib/prisma";
import { requireAdmin } from "@/src/lib/auth/require-admin";
// import { CreateFacultyForm } from "./_components/CreateFacultyForm";

export const dynamic = "force-dynamic";

export default async function AdminFacultiesPage() {
  await requireAdmin();

  const faculties = await prisma.faculty.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          schools: true,
          departments: true,
          classrooms: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mt-1 text-2xl font-bold text-[#031b46] md:text-3xl">
            Facultades
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Administra las facultades de la universidad. Cada facultad puede
            contener escuelas, departamentos, aulas y laboratorios.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total de facultades
          </p>
          <p className="mt-1 text-3xl font-bold text-[#031b46]">
            {faculties.length}
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#031b46]">
                Lista de facultades
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Facultades registradas actualmente en el sistema.
              </p>
            </div>

            <div className="flex w-full items-center rounded-xl border border-slate-200 bg-white px-3 py-2 md:w-72">
              <Search className="mr-2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar facultad..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {faculties.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-500">
                <Building2 className="h-8 w-8" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#031b46]">
                No hay facultades registradas
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Crea la primera facultad usando el formulario de la derecha.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-195 text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Facultad</th>
                    <th className="px-6 py-4 font-bold">Código</th>
                    <th className="px-6 py-4 font-bold">Escuelas</th>
                    <th className="px-6 py-4 font-bold">Departamentos</th>
                    <th className="px-6 py-4 font-bold">Aulas</th>
                    <th className="px-6 py-4 text-right font-bold">Acción</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {faculties.map((faculty) => (
                    <tr
                      key={faculty.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#031b46]/5 text-[#031b46]">
                            <Building2 className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="font-bold text-slate-800">
                              {faculty.name}
                            </p>

                            <p className="mt-1 line-clamp-1 max-w-xs text-xs text-slate-500">
                              {faculty.description ??
                                "Sin descripción registrada"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                          {faculty.code}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <GraduationCap className="h-4 w-4 text-slate-400" />
                          {faculty._count.schools}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Layers3 className="h-4 w-4 text-slate-400" />
                          {faculty._count.departments}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {faculty._count.classrooms}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/faculties/${faculty.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* <CreateFacultyForm /> */}
      </section>
    </div>
  );
}
