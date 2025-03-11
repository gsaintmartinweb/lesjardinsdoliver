"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to homepage or login page
  };

  return (
    <button onClick={handleLogout} className="text-red-500 font-bold">
      Se déconnecter
    </button>
  );
}
