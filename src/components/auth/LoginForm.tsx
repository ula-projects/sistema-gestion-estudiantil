"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, IdCard, LockKeyhole, Mail } from "lucide-react";

type LoginType = "email" | "institutionalId";

export function LoginForm() {
  const router = useRouter();

  const [loginType, setLoginType] = useState<LoginType>("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const identifierConfig = useMemo(() => {
    if (loginType === "email") {
      return {
        label: "Email",
        placeholder: "tu@email.com",
        type: "email",
        icon: Mail,
      };
    }

    return {
      label: "Cedula de Identidad",
      placeholder: "Ej: V012345678",
      type: "text",
      icon: IdCard,
    };
  }, [loginType]);

  const IdentifierIcon = identifierConfig.icon;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Ingresa tus credenciales para continuar.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });

      if (result?.error) {
        setErrorMessage("Credenciales inválidas. Verifica tus datos.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setErrorMessage("Ocurrió un error al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLoginTypeChange(type: LoginType) {
    setLoginType(type);
    setIdentifier("");
    setErrorMessage("");
  }

  return (
    <div className="w-full max-w-xl">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
          Bienvenido
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#061b3a]">
          Iniciar sesión
        </h1>

        <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
          Ingresa con tu email o con tu C.I. para acceder a tu cuenta.
        </p>
      </div>

      <div className="mt-9 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
        <button
          type="button"
          onClick={() => handleLoginTypeChange("email")}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${
            loginType === "email"
              ? "bg-[#061b3a] text-white shadow-sm"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <Mail size={18} />
          Email
        </button>

        <button
          type="button"
          onClick={() => handleLoginTypeChange("institutionalId")}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${
            loginType === "institutionalId"
              ? "bg-[#061b3a] text-white shadow-sm"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <IdCard size={18} />
          C.I.
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="identifier"
            className="mb-2 block text-sm font-bold text-[#061b3a]"
          >
            {identifierConfig.label}
          </label>

          <div className="relative">
            <IdentifierIcon
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="identifier"
              name="identifier"
              type={identifierConfig.type}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder={identifierConfig.placeholder}
              autoComplete={loginType === "email" ? "email" : "username"}
              className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0b3b75] focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-[#061b3a]"
          >
            Contraseña
          </label>

          <div className="relative">
            <LockKeyhole
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0b3b75] focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#061b3a]"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="mt-3 flex justify-end">
            <a
              href="#"
              className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 text-sm font-extrabold text-[#061b3a] shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LockKeyhole size={19} />
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-sm font-medium text-slate-500">
          Acceso institucional
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{" "}
        <a href="#" className="font-bold text-blue-700 hover:text-blue-900">
          Contacta a tu institución
        </a>
      </p>

      <div className="mt-10 flex flex-col justify-between gap-3 text-center text-xs text-slate-500 sm:flex-row">
        <p>© 2026 Universidad de los Andes - Sistema de Gestion Academica</p>

        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-[#061b3a]">
            Términos de uso
          </a>
          <a href="#" className="hover:text-[#061b3a]">
            Política de privacidad
          </a>
        </div>
      </div>
    </div>
  );
}
