import { Clock3, Landmark, UsersRound, UserRoundCheck } from "lucide-react";

const stats = [
  {
    label: "Facultades",
    value: "12",
    icon: Landmark,
  },
  {
    label: "Estudiantes",
    value: "8,500+",
    icon: UsersRound,
  },
  {
    label: "Docentes",
    value: "320",
    icon: UserRoundCheck,
  },
  {
    label: "Acceso",
    value: "24/7",
    icon: Clock3,
  },
];

export function StatsSection() {
  return (
    <section id="facultades" className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex items-center gap-5 p-8 ${
                  index !== stats.length - 1
                    ? "border-b border-slate-200 sm:border-r lg:border-b-0"
                    : ""
                }`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0b3b75]">
                  <Icon size={30} />
                </div>

                <div>
                  <p className="text-3xl font-extrabold text-[#061b3a]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
