"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function SignOutBtn() {
  const session = useSession();

  console.log(session);

  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="text-red-600 border border-red-600 rounded-lg px-4 py-2 bg-red-600/10"
    >
      Cerrar sesión
    </button>
  );
}
