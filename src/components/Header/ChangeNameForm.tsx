import React, { useState } from "react";
import userService from "@/services/userService";
import { toast } from "react-hot-toast";
import { useUser } from "@/Hook/UserProvider";
import LoaderButton from "@/components/Header/LoaderButton";
import { User, Check } from "lucide-react";

export default function ChangeNameForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Veuillez entrer un nom.");
      return;
    }

    setLoading(true);

    try {
      const res = await userService.updateName({
        name: name.trim(),
      });

      toast.success(res.data.message || "Nom mis à jour avec succès.");

      // Mise à jour immédiate du contexte utilisateur
      setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          name: name.trim(),
        };
      });

      onClose();
    } catch (error) {
      console.error("Erreur mise à jour du nom :", error);

      toast.error("Erreur lors de la mise à jour du nom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Introduction */}

      <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <User size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800">
            Modifier votre nom
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            Ce nom sera affiché sur votre profil.
          </p>
        </div>
      </div>

      {/* Champ */}

      <div>
        <label
          htmlFor="user-name"
          className="mb-2 block text-xs font-semibold text-gray-700"
        >
          Nouveau nom
        </label>

        <div className="relative">
          <User
            size={17}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            id="user-name"
            type="text"
            placeholder="Entrez votre nouveau nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              py-3
              pl-10
              pr-4
              text-sm
              text-gray-800
              outline-none
              transition-all
              placeholder:text-gray-400
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10
            "
          />
        </div>
      </div>

      {/* Bouton */}

      <div className="pt-1">
        <LoaderButton loading={loading}>
          <span className="flex items-center justify-center gap-2">
            <Check size={16} />
            Sauvegarder
          </span>
        </LoaderButton>
      </div>
    </form>
  );
}
