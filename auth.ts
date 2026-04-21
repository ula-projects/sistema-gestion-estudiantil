import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { password, username } = credentials;
        if (!username || !password) {
          throw new InvalidLoginError();
        }

        const user = await prisma.user.findUnique({
          where: { id: username as string },
        });

        if (user) {
          return { email: "nohay", name: user.name };
        }

        throw new InvalidLoginError();
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 600, updateAge: 0 },
  callbacks: {
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      // 1. Al iniciar sesión por primera vez
      if (user) {
        token.expiresAt = now + 10 * 60; // Guardamos el momento exacto del fin
      }

      // 2. Verificación manual en cada llamada al token
      // Si el tiempo actual superó nuestro límite guardado, invalidamos el token
      if (now > (token.expiresAt as number)) {
        return null; // Esto destruye la sesión
      }
      return token;
    },
  },
});
