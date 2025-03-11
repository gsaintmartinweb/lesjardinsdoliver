"use client";

import { Layout } from "./components/layout";
import FeatureGallery from "./components/feature-gallery";
import LoginButton from "./components/login-button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <main className="p-0">
        <div
          className="w-full h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(images/bg-2.jpeg)" }}
        >
          <div className="flex items-center justify-center h-full text-white text-center">
            <div>
              <h1 className="text-8xl font-bold text-white">Les Jardins d&apos;Oliver</h1>
              <FeatureGallery></FeatureGallery>

              {session && <h1>admin</h1>}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
