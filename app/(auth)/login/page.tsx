import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  // const handleSubmit = async (e: React.FormEvent) => {}
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     // const res = await fetch("/api/login", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({ email, password }),
  //     // });

  //     // const data = await res.json();

  //     // if (!res.ok) {
  //     //   throw new Error(data.message || "Login failed");
  //     // }

  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1000);
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.log(error.message as string);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center transition-colors">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all mx-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Iniciar Sesión
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Bienvenido Estudiante
        </p>

        <LoginForm />

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
