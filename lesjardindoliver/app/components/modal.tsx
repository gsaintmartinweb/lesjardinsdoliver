import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  creation: { src: string; description: string, advice: string, title: string } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, creation }) => {
  if (!isOpen || !creation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto p-6 sm:p-8 space-y-6 transform transition-transform">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">{creation.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
          >
            &times;
          </button>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {creation.description}
          </p>
        </div>

        {/* Preparation Advice Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Conseil d&apos;entretien</h3>
          <p className="text-gray-600 leading-relaxed italic text-justify">
            {creation.advice}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={onClose}
            className="bg-emerald-600 text-white text-sm py-2 px-4 rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
