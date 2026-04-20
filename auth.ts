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
          where: { email: username as string },
        });

        throw new InvalidLoginError();
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 600 },
});
