"use client";

import { Plant } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type PlantWithSignedUrl = Plant & { signedUrl: string };

type PlantPageProps = {
  params: {
    id: string;
  };
};

const PlantPage = ({ params }: PlantPageProps) => {
  const [currentPlant, setCurrentPlant] = useState<PlantWithSignedUrl | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlant = async () => {
      console.log("📡 Fetching plant with ID:", params.id);
      try {
        const response = await axios.get(`/api/plants/${params.id}`);
        console.log("✅ API Response:", response.data);
        setCurrentPlant(response.data);
      } catch (error) {
        console.error("❌ Error fetching plant:", error);
        setError("Plant not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [params.id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading plant details...</div>;
  }

  if (error || !currentPlant) {
    return <div className="text-center text-red-500">Error: {error || "Plant not found."}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-4 text-black">
      <h1 className="text-2xl font-bold text-gray-800">{currentPlant.title}</h1>
      <Image
        src={currentPlant.signedUrl} // Use signedUrl instead of src
        alt={currentPlant.title}
        width={500}
        height={300}
        className="w-full h-auto mt-4"
      />
      <p className="mt-4">{currentPlant.description}</p>
      <p className="mt-2">
        <strong>Conseils:</strong> {currentPlant.advice}
      </p>
      <p className="mt-2">
        <strong>Prix:</strong> {currentPlant.price} €
      </p>
    </div>
  );
};

export default PlantPage;