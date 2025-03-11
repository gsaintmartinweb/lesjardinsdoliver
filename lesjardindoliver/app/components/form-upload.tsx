"use client";
import { useState } from "react";
import { toast, Toaster } from "sonner";

type FileUploadProps = {
  onFileUpload: (fileUrl: string) => void;
};

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>(""); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      // Validate file type
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)
      ) {
        toast.error("Unsupported file type");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB");
        return;
      }

      setFile(selectedFile);
      setFileUrl("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result);
        onFileUpload(result.s3Url);
        setFileUrl(result.s3Url);
        toast.success("File uploaded successfully");
      } else {
        toast.error(result.details || "File upload failed");
      }
    } catch (err) {
      toast.error("Error uploading file");
      console.error(err);
    } finally {
      setUploading(false);

      // Reset file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Télécharger un fichier
      </h2>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-600"
        >
          Sélectionner un fichier
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="block w-full px-3 py-2 text-sm text-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow ${
            uploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-150`}
        >
          {uploading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Téléchargement en cours...
            </>
          ) : (
            "Télécharger"
          )}
        </button>
      </div>
      {fileUrl && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">
            Fichier téléchargé avec succès :{" "}
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-1"
            >
              Voir le fichier {fileUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
