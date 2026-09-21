import React, { useState } from "react";
import userService from "@/services/userService";
import { toast } from "react-hot-toast";
import { useUser } from "@/Hook/UserProvider";
import LoaderButton from "@/components/Header/LoaderButton";
import { Camera, ImagePlus, Upload } from "lucide-react";

export default function ChangePhotoForm({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  // =====================================================
  // SÉLECTION DE LA PHOTO
  // =====================================================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  // =====================================================
  // ENVOI DE LA PHOTO
  // =====================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Veuillez choisir une image !");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("photo", file);

    try {
      const res = await userService.updatePhoto(formData);

      toast.success(res.data.message || "Photo mise à jour avec succès.");

      // =================================================
      // MISE À JOUR IMMÉDIATE DU USERPROVIDER
      // =================================================

      const updatedUser = res.data.user;

      setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          image: updatedUser?.image ?? prev.image,
        };
      });

      // Fermer le modal
      onClose();
    } catch (error) {
      console.error("Erreur mise à jour photo :", error);

      toast.error("Erreur lors de la mise à jour de la photo.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Introduction */}

      <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/60 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
          <Camera size={19} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800">Photo de profil</h3>

          <p className="mt-0.5 text-xs text-gray-500">
            Choisissez une nouvelle photo pour votre profil.
          </p>
        </div>
      </div>

      {/* Zone image */}

      <label
        htmlFor="profile-photo"
        className="
          group
          relative
          flex
          min-h-[220px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border-2
          border-dashed
          border-gray-200
          bg-gray-50
          transition-all
          hover:border-purple-400
          hover:bg-purple-50/40
        "
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Aperçu"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-black/40
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            >
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg">
                <Upload size={15} />
                Changer la photo
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-transform group-hover:scale-105">
              <ImagePlus size={25} />
            </div>

            <p className="text-sm font-semibold text-gray-700">
              Choisir une photo
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Cliquez pour sélectionner une image
            </p>

            <span className="mt-3 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-gray-400 shadow-sm">
              JPG · PNG · WEBP
            </span>
          </>
        )}

        <input
          id="profile-photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Nom du fichier */}

      {file && (
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <ImagePlus size={15} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-gray-700">
              {file.name}
            </p>

            <p className="text-[10px] text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} Mo
            </p>
          </div>
        </div>
      )}

      {/* Bouton */}

      <div className="pt-1">
        <LoaderButton loading={loading}>
          <span className="flex items-center justify-center gap-2">
            <Camera size={16} />
            Mettre à jour la photo
          </span>
        </LoaderButton>
      </div>
    </form>
  );
}
