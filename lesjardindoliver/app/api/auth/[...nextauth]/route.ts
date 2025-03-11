import NextAuth from "next-auth";
import { authOptions } from "../next-auth-config"; // Adjust the path to your `authOptions`

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
