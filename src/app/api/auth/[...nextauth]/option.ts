import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  accessToken: string;
}

export const authOption: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Username:",
          type: " text",
          placeholder: "Your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password Here",
        },
      },
      authorize: async (
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> => {
        try {
          const response: AxiosResponse<any, any> = await axios.post(
            "https://next-app-backend.onrender.com",
            credentials
          );

          const user = response.data.user;

          if (user) {
            return {
              id: user._id,
              email: user.email,
              name: user.name,
              password: user.password,
              accessToken: user.accessToken,
            };
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        if (user) return true;
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if(session){
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/user/login",
  },
};
