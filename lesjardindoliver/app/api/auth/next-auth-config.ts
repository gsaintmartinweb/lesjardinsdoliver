import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "keycloak",
      name: "Keycloak",
      type: "oauth",
      wellKnown: `${process.env.KEYCLOAK_ISSUER}/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username || null,
          email: profile.email || null,
          image: null,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      const logoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.KEYCLOAK_CLIENT_ID}&refresh_token=${token.refreshToken}`;
      try {
        await fetch(logoutUrl, { method: "POST" });
      } catch (err) {
        console.error("Error logging out from Keycloak:", err);
      }
    },
  },
};


export default NextAuth(authOptions);
