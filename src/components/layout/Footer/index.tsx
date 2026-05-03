import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  "Inicio",
  "Servicios",
  "Facultades",
  "Noticias",
  "Calendario académico",
];

const services = [
  "Inscripción de materias",
  "Historial académico",
  "Horarios",
  "Trámites",
  "Biblioteca virtual",
];

const support = [
  "Centro de ayuda",
  "Preguntas frecuentes",
  "Guías de usuario",
  "Contacto",
  "Reportar un problema",
];

export default function Footer() {
  return (
    <footer id="soporte" className="bg-[#061b3a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/">
              <Image
                src="/images/ula-logo-white.png"
                width={270}
                height={72}
                alt="ULA Logo"
                className="w-50"
                loading="eager"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Plataforma oficial para la gestión académica de nuestra comunidad
              universitaria.
            </p>

            <div className="mt-6 flex gap-3">
              {/* {[Facebook, Instagram, Youtube].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-yellow-400 hover:text-[#061b3a]"
                >
                  <Icon size={18} />
                </Link>
              ))} */}
            </div>
          </div>

          <FooterColumn title="Enlaces rápidos" items={quickLinks} />
          <FooterColumn title="Servicios" items={services} />
          <FooterColumn title="Soporte" items={support} />
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-3">
          <div className="flex items-start gap-3 text-sm text-slate-300">
            <MapPin size={18} className="mt-0.5 text-yellow-400" />
            <span>
              Av. Universidad 1234
              <br />
              Ciudad Universitaria
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Mail size={18} className="text-yellow-400" />
            <span>soporte@universidad.edu</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Phone size={18} className="text-yellow-400" />
            <span>(01) 123 456 7890</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row">
          <p>© 2026 Universidad. Todos los derechos reservados.</p>

          <div className="flex gap-5">
            <Link href="#" className="hover:text-yellow-400">
              Términos de uso
            </Link>
            <Link href="#" className="hover:text-yellow-400">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold text-white">{title}</h3>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-sm text-slate-300 transition hover:text-yellow-400"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
