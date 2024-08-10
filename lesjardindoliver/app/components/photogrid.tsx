"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from './modal';

export interface Creation {
  src: string;
  title: string;
  description: string;
  advice: string;
  price: string;
  width: number;
  height: number;
}

interface PhotoGridProps {
  creations: Creation[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ creations }) => {
  const [selectedCreation, setSelectedCreation] = useState<{ src: string; description: string, advice: string, title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (creation: { src: string; description: string, advice: string, title: string }) => {
    setSelectedCreation(creation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCreation(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 bg-grey-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {creations.map((creation, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <Image
              src={creation.src}
              alt={creation.description}
              width={creation.width}
              height={creation.height}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 flex justify-between items-center bg-gray-900">
              <p className="text-xl text-slate-300 flex-grow backdrop-blur-sm rounded-lg p-2">{creation.title.toUpperCase()}</p>
              <button
                onClick={() => openModal(creation)}
                className="bg-emerald-500 text-white text-sm py-2 px-4 rounded hover:bg-emerald-300 ml-2"
              >
                Détail
              </button>
            </div>
            <div className="absolute top-2 right-4 bg-white text-gray-800 text-sm py-1 px-2 rounded-full shadow-md">
              {creation.price}
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} creation={selectedCreation} />
    </div>
  );
};

export default PhotoGrid;
