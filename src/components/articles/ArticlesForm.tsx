import React from "react";
import ImageUploader from "./ImageUploader";

interface ArticleFormProps {
  title: string;
  content: string;
  category: string;
  image?: File | null; // ✅ cohérent avec ImageUploader
  progress: number;
  error?: string | null;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  title,
  content,
  category,
  image,
  progress,
  error,
  onTitleChange,
  onContentChange,
  onCategoryChange,
  onImageChange,
  onImageRemove,
  onSubmit,
}) => (
  <form className="flex flex-col gap-5" onSubmit={onSubmit}>
    <input
      type="text"
      value={title}
      onChange={onTitleChange}
      placeholder="Titre de l'article"
      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <textarea
      value={content}
      onChange={onContentChange}
      placeholder="Contenu de l'article"
      rows={5}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    ></textarea>
    <select
      value={category}
      onChange={onCategoryChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="Tech">Tech</option>
      <option value="Design">Design</option>
      <option value="Actu">Actu</option>
    </select>

    {/* ✅ afficher le nom du fichier si présent */}
    {image ? (
      <div className="text-sm text-gray-600">
        Fichier sélectionné : {image.name}
      </div>
    ) : (
      <p className="text-sm text-gray-400">Aucune image sélectionnée</p>
    )}

    <ImageUploader
      image={image} // ✅ passe le File directement
      progress={progress}
      error={error}
      onChange={onImageChange}
      onRemove={onImageRemove}
    />

    <button
      type="submit"
      className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition"
    >
      Publier
    </button>
  </form>
);

export default ArticleForm;
