"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
