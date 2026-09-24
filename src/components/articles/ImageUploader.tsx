import React from "react";
import { motion } from "framer-motion";

interface ImageUploaderProps {
  image?: File | null; // ✅ corriger ici
  progress: number;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  progress,
  error,
  onChange,
  onRemove,
}) => (
  <div className="flex flex-col gap-3">
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />

    {error && <p className="text-red-500 text-sm">{error}</p>}

    {progress > 0 && progress < 100 && (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}

    {image && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        {/* ✅ si c’est un File, afficher son nom */}
        {image instanceof File ? (
          <p className="text-sm text-gray-600">{image.name}</p>
        ) : (
          <p className="text-sm text-gray-400">Aucune image sélectionnée</p>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Supprimer
        </button>
      </motion.div>
    )}
  </div>
);

export default ImageUploader;
