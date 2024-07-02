"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from './modal';

interface Photo {
  src: string;
  description: string;
  width: number;
  height: number;
}

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; description: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (photo: { src: string; description: string }) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {photos.map((photo, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <Image
              src={photo.src}
              alt={photo.description}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <p className="text-sm text-gray-700 flex-grow">{photo.description}</p>
              <button
                onClick={() => openModal(photo)}
                className="bg-slate-500 text-white text-xs py-1 px-2 rounded hover:bg-slate-700 ml-2"
              >
                Détail
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} photo={selectedPhoto} />
    </div>
  );
};

export default PhotoGrid;
