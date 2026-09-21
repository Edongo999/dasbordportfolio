import React, { useState } from "react";
import userService from "@/services/userService";
import { toast } from "react-hot-toast";
import LoaderButton from "@/components/Header/LoaderButton";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function ChangePasswordForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);

    try {
      const res = await userService.updatePassword({
        current_password: currentPassword,
        new_password: password,
        new_password_confirmation: confirm,
      });

      toast.success(res.data.message);
      onClose();
    } catch {
      toast.error("Erreur lors de la mise à jour du mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Introduction */}
      <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <ShieldCheck size={19} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800">
            Sécurité du compte
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            Choisissez un nouveau mot de passe sécurisé.
          </p>
        </div>
      </div>

      {/* Mot de passe actuel */}
      <div>
        <label
          htmlFor="current-password"
          className="mb-2 block text-xs font-semibold text-gray-700"
        >
          Mot de passe actuel
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="current-password"
            type="password"
            placeholder="Votre mot de passe actuel"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
              focus:border-indigo-500
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-500/10
            "
          />
        </div>
      </div>

      {/* Nouveau mot de passe */}
      <div>
        <label
          htmlFor="new-password"
          className="mb-2 block text-xs font-semibold text-gray-700"
        >
          Nouveau mot de passe
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="new-password"
            type="password"
            placeholder="Votre nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              focus:border-indigo-500
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-500/10
            "
          />
        </div>
      </div>

      {/* Confirmation */}
      <div>
        <label
          htmlFor="confirm-password"
          className="mb-2 block text-xs font-semibold text-gray-700"
        >
          Confirmer le mot de passe
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="confirm-password"
            type="password"
            placeholder="Confirmez votre nouveau mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`
              w-full
              rounded-xl
              border
              bg-gray-50
              py-3
              pl-10
              pr-4
              text-sm
              text-gray-800
              outline-none
              transition-all
              placeholder:text-gray-400
              focus:bg-white
              focus:ring-4
              ${
                confirm && password !== confirm
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/10"
              }
            `}
          />
        </div>

        {confirm && password !== confirm && (
          <p className="mt-2 text-xs font-medium text-red-500">
            Les mots de passe ne correspondent pas.
          </p>
        )}

        {confirm && password === confirm && (
          <p className="mt-2 text-xs font-medium text-green-600">
            ✓ Les mots de passe correspondent.
          </p>
        )}
      </div>

      {/* Bouton */}
      <div className="pt-1">
        <LoaderButton loading={loading}>
          <span className="flex items-center justify-center gap-2">
            <ShieldCheck size={16} />
            Modifier le mot de passe
          </span>
        </LoaderButton>
      </div>
    </form>
  );
}
