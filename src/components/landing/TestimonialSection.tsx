import { Landmark, Quote } from "lucide-react";

export function TestimonialSection() {
  return (
    <section className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#061b3a] px-8 py-12 shadow-xl lg:px-14">
          <div className="absolute -left-8 -top-8 text-white/5">
            <Landmark size={180} />
          </div>

          <div className="relative max-w-4xl">
            <Quote className="mb-5 text-yellow-400" size={38} />

            <p className="text-2xl font-semibold leading-10 text-white">
              Una experiencia digital pensada para acompañar al estudiante
              durante toda su trayectoria universitaria.
            </p>

            <p className="mt-5 font-semibold text-yellow-400">
              Comprometidos con tu formación, comprometidos contigo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
