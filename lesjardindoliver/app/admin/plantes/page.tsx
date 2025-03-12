"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plant } from "@prisma/client";
import CreatePlantModal from "../components/create-plant-modal";
import Link from "next/link";
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

const PlantesPage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("/api/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold text-gray-800">Plantes</h1>
      <CreatePlantModal onPlantCreated={fetchPlants} />

      {/* Scrollable Table Wrapper */}
      <div className="overflow-auto border border-gray-200 rounded-lg shadow mt-4">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <TableHeader>Nom</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Conseils</TableHeader>
              <TableHeader>Prix</TableHeader>
              <TableHeader>Lien</TableHeader>
              <TableHeader className="sticky right-0 bg-gray-50 shadow-md">
                Actions
              </TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plants.map((plant) => (
              <tr key={plant.id} className="hover:bg-gray-50 transition">
                <TableData>{plant.title}</TableData>
                <TableData>{plant.description}</TableData>
                <TableData>{plant.advice}</TableData>
                <TableData>{plant.price}</TableData>
                <TableData>
                  {plant.src}
                </TableData>
                <TableData className="sticky right-0 bg-white shadow-md">
                  <div className="flex items-center"> 
                  <Link
                    href={`/plantes/${plant.id}`}
                    className="flex items-center text-amber-700 hover:text-amber-900"
                  >
                    <EyeOpenIcon className="mr-2 h-5 w-5" />
                  </Link>
                  <Link
                    href={`/plant/update/${plant.id}`}
                    className="flex items-center text-amber-700 hover:text-amber-900"
                  >
                    <Pencil2Icon className="mr-2 h-5 w-5" />
                  </Link>
                  <Link
                    href={`/plant/delete/${plant.id}`}
                    className="flex items-center text-amber-700 hover:text-amber-900"
                  >
                    <TrashIcon className="mr-2 h-5 w-5" />
                  </Link>
                  </div>
                  
                </TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function TableHeader(props: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${props.className}`}
    >
      {props.children}
    </th>
  );
}

function TableData(props: { children: React.ReactNode; className?: string }) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-gray-900 text-sm ${props.className}`}
    >
      {props.children}
    </td>
  );
}

export default PlantesPage;