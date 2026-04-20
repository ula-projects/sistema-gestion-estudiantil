"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isEmail, setIsEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "Login failed");
      // }

      setTimeout(() => {
        router.push("/");
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  const toggleIsEmail = () => {
    setEmail("");
    setIsEmail(!isEmail);
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all mx-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Iniciar Sesión
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Bienvenido Estudiante
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block mb-1 text-gray-600 dark:text-gray-300"
              htmlFor="email"
            >
              {isEmail ? "Cedula" : "Email"} o{" "}
              <button
                type="button"
                onClick={toggleIsEmail}
                className="text-blue-400 cursor-pointer"
              >
                {isEmail ? "Email" : "Cedula"}
              </button>
            </label>
            {isEmail ? (
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="V012345789"
                autoComplete="none"
                className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="estudiante@ula.com"
                className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          <div>
            <label
              className="block mb-1 text-gray-600 dark:text-gray-300"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-400 hover:bg-blue-600 text-white font-semibold transition"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <hr className="border-zinc-200 my-6" />

        <div>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Olvidaste tu contraseña?{" "}
            <span className="text-blue-400 cursor-pointer">
              Recuperar Contaseña
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
