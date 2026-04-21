"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [credential, setCredential] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  const toggleIsEmail = () => {
    setCredential("");
    setIsEmail(!isEmail);
  };

  // const validateCredentials = () => {
  //   return true;
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   // const {} = e.

  //   if (!validateCredentials()) return;

  //   try {
  //     const res = await signIn("credentials", {});

  //     // if (res?.error) {
  //     // }
  //     // const result = await signIn("credentials", {
  //     //   email,
  //     //   password,
  //     //   redirect: true,
  //     //   callbackUrl: "/",
  //     // });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await signIn("credentials", {
          username: "V027777348",
          password: "asdasd",
        });
      }}
      className="space-y-4"
      method="POST"
    >
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
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="V012345789"
            autoComplete="none"
            className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <input
            id="email"
            type="email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error.message}</p>
      )}
    </form>
  );
}
