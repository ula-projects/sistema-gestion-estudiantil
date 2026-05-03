import {
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  GraduationCap,
  UserRoundCog,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    title: "Historial académico",
    description: "Consulta tus notas y materias aprobadas de forma rápida.",
    icon: ClipboardList,
  },
  {
    title: "Inscripción de materias",
    description: "Inscríbete en tus materias de manera fácil y segura.",
    icon: GraduationCap,
  },
  {
    title: "Seguimiento de progreso",
    description: "Visualiza tu avance académico y cumple tus metas.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Datos personales",
    description: "Mantén tu información personal actualizada en todo momento.",
    icon: UserRoundCog,
  },
  {
    title: "Horarios",
    description: "Consulta tus horarios de clases y organiza tu tiempo.",
    icon: CalendarDays,
  },
  {
    title: "Notificaciones",
    description: "Recibe avisos importantes sobre tu vida académica.",
    icon: Bell,
  },
];

export function FeaturesSection() {
  return (
    <section id="servicios" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
            Servicios
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#061b3a] sm:text-4xl">
            Todo lo que necesita un estudiante en una sola plataforma
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Centraliza los procesos académicos más importantes y mejora la
            experiencia digital de estudiantes, docentes y administradores.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
