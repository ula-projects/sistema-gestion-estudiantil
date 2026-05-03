import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#0b3b75] transition group-hover:bg-[#0b3b75] group-hover:text-white">
        <Icon size={30} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#061b3a]">{title}</h3>

      <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-yellow-400" />

      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
