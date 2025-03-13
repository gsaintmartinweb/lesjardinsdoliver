"use client";

import { getPlantById } from "@/app/actions/get-plan-by-id";
import { Plant } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";


type PlantPageProps = {
  params: {
    id: string;
  };
};

function PlantePage({ params }: PlantPageProps) {
  const [currentPlant, setCurrentPlant] = useState<Plant | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string>("");

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await getPlantById(Number(params.id));
        if (response && response.plant && response.plant.signedUrl) {
          setSignedUrl(response.plant.signedUrl);
          setCurrentPlant(response.plant);
        } else {
          setError("Plant not found.");
        }
      } catch (err) {
        setError("Failed to fetch plant details.");
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
        src={signedUrl} // Use signedUrl instead of src
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
}

export default PlantePage;