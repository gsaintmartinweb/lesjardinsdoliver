"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ImageGallery2 = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((url, index) => (
        <Image
        key={index}
        src={url}
        alt={`Gallery item ${index + 1}`}
        sizes='(max-width: 768px) 100vw, 1200px'
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-110"
        />
      ))}
    </div>
  );
};

export default ImageGallery2;
