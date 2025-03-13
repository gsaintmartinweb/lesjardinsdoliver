"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to homepage or login page
  };

  return (
    <button onClick={handleLogout} className="text-red-500 font-bold flex gap-2 align-middle items-center">
      <ExitIcon className="h-5 w-5" /> <span>Se déconnecter</span>
    </button>
  );
}
