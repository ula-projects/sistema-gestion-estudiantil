import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { auth } from "@/auth";
import { UserDropdown } from "./UserDropdown";
import type { HeaderUser } from "./UserDropdown";
// import { User } from "next-auth";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Facultades", href: "/#facultades" },
  { label: "Soporte", href: "/#soporte" },
];

export default async function Header() {
  const session = await auth();

  const sessionUser = session?.user as HeaderUser | undefined;

  const user: HeaderUser | null = sessionUser
    ? {
        name: sessionUser.name ?? "Usuario",
        email: sessionUser.email ?? "",
        role: sessionUser.role ?? null,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 box-border h-20 bg-[#061b3a]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
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

        {!user && (
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-200 transition hover:text-yellow-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-yellow-400 hover:text-[#061b3a]"
          >
            <UserRound size={18} />
            Acceder
          </Link>
        )}
      </div>
    </header>
  );
}
