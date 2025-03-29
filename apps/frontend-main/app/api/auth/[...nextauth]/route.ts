import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

// login with password / email | login with google
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const res = await axios.post(
          `${process.env.BACKEND_URL}/api/v1/auth/signin`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          { withCredentials: true }
        );

        console.log("Backend Response:", res.data);

        if (res.data.success) {
          return { id: res.data.user._id, name: res.data.user.username };
        }

        return null;
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export const GET = handler;
export const POST = handler;
