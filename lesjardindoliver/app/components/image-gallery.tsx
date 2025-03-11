"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalGallery from "./modal-gallery";

const PhotoGallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/get-images");
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p className="text-black">Loading images...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-6">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg h-96 cursor-pointer"
            onClick={() => openModal(url)}
          >
            <Image
              src={url}
              alt={`Gallery item ${index + 1}`}
              sizes="(max-width: 768px) 100vw, 1200px"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ModalGallery
          isOpen={isOpen}
          onClose={closeModal}
          imageSrc={selectedImage}
          altText="Full size image"
        />
      )}
    </>
  );
};

export default PhotoGallery;
