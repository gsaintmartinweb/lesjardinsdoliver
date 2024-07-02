import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: { src: string; description: string } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, photo }) => {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z[70]">
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Photo Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <div className="mb-4">
          <img src={photo.src} alt={photo.description} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <p className="text-gray-700">{photo.description}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-slate-500 text-white text-xs py-1 px-2 rounded hover:bg-slate-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
