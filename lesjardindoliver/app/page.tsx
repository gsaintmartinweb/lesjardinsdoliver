import Image from "next/image";
import { Layout } from "./components/layout";
import MinimalistButton from "./components/minimalist-button";

export default function Home() {
  return (
    <Layout>
      <main className="p-0">
        <div
          className="w-full h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(images/bg-2.jpeg)" }}
        >
          <div className="flex items-center justify-center h-full text-white text-center">
            <div>
              <h1 className="text-8xl font-bold">Les Jardins d&apos;Oliver</h1>
              <p className="mt-4 text-4xl">Bienvenue</p>
              <MinimalistButton label="Voir mes créations" className="mt-6"></MinimalistButton>{" "}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
