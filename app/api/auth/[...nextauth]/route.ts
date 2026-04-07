import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return null;
        //     if (!credentials?.email || !credentials?.password) {
        //       throw new Error("Invalid credentials.");
        //     }
        //     const snap = await db
        //       .collection("users")
        //       .where("email", "==", credentials.email)
        //       .limit(1)
        //       .get();

        //     if (snap.empty) {
        //       throw new Error("Invalid email or password.");
        //     }

        //     const doc = snap.docs[0];
        //     const user = doc.data();

        //     if (!user) {
        //       throw new Error("User not found.");
        //     }

        //     if (!user.password) {
        //       throw new Error("Use another authentication method.");
        //     }

        //     const isValid = await bcrypt.compare(
        //       credentials.password,
        //       user.password,
        //     );

        //     if (!isValid) {
        //       throw new Error("Wrong password.");
        //     }

        //     const user_res: AuthUser = {
        //       email: user?.email,
        //       name: user?.name,
        //       id: user?.id,
        //       image: user?.image,
        //       role: user?.role,
        //     };

        //     return user_res;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token }) {
      //   if (token) {
      //     const snap = await db
      //       .collection("users")
      //       .where("email", "==", token.email)
      //       .limit(1)
      //       .get();

      //     if (snap.empty) {
      //       throw new Error("Invalid User.");
      //     }

      //     const doc = snap.docs[0];
      //     const user = doc.data();
      //     token.role = user.role;
      //     token.id = user.id;
      //   }

      return token;
    },
    async session({ session, token }) {
      //   session.user.role = token.role as string;
      //   session.user.id = token.id as string;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
