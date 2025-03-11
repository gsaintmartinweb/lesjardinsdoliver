import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

const ModalGallery: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  altText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-4xl w-full p-4">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-white text-3xl p-3 rounded-full hover:bg-opacity-50 hover:bg-gray-700 transition duration-300"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="relative w-full h-96 md:h-[70vh]">
          <Image
            src={imageSrc}
            alt={altText}
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
