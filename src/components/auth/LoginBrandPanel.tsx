import { CalendarDays, ShieldCheck } from "lucide-react";

export function LoginBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-[#061b3a]/10 text-white lg:block">
      <div className="absolute inset-0 bg-linear-to-r from-[#061b3a] via-[#061b3a]/90 to-[#061b3a]/40" />
      <div className="absolute inset-0 bg-linear-to-t from-[#061b3a] via-transparent to-[#061b3a]/20" />

      <div className="relative z-10 flex min-h-ful flex-col justify-between px-12 py-10">
        <div>
          <div className="mt-20 max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
              Tu vida académica,{" "}
              <span className="text-yellow-400">en un solo lugar</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-100">
              Accede a tus cursos, calificaciones, horarios, inscripciones y
              más. Todo lo que necesitas para alcanzar tus metas.
            </p>

            <div className="mt-8 h-1 w-14 rounded-full bg-yellow-400" />
          </div>

          <div className="mt-12 max-w-md mb-5 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-400">
                <CalendarDays size={26} />
              </div>

              <div>
                <h3 className="font-bold text-white">¿Primera vez aquí?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Si eres nuevo estudiante, activa tu cuenta con los datos
                  asignados en tu seleccion de materias
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-slate-200">
            <ShieldCheck size={24} />
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              Seguridad y privacidad
            </p>
            <p className="text-sm text-slate-300">
              Tu información está protegida durante el acceso.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
