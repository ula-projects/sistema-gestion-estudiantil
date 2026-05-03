import { ClipboardCheck, LockKeyhole, Search } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Accede",
    description:
      "Inicia sesión con tus credenciales institucionales de manera segura y rápida.",
    icon: LockKeyhole,
  },
  {
    number: "2",
    title: "Consulta",
    description:
      "Explora tu información académica, revisa tus cursos, notas, horarios y más.",
    icon: Search,
  },
  {
    number: "3",
    title: "Gestiona",
    description:
      "Realiza inscripciones, actualiza tus datos y da seguimiento a tu progreso académico.",
    icon: ClipboardCheck,
  },
];

export function StepsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
            Así funciona
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#061b3a] sm:text-4xl">
            Todo lo que necesitas en 3 simples pasos
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[18%] right-[18%] top-12 hidden border-t-2 border-dashed border-slate-300 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[#0b3b75] shadow-sm">
                  <Icon size={38} />
                </div>

                <div className="mx-auto mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#061b3a] text-sm font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#061b3a]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
