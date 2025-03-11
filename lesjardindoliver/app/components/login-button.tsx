"use client";

import { signIn, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return <p>Welcome, {session.user?.name}!</p>;
  }

  return (
    <button
      className="text-black text-xl font-bold"
      onClick={() => signIn("keycloak")}
    >
      Login with Keycloak
    </button>
  );
}
