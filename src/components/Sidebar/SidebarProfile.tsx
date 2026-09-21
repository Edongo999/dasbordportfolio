import React, { useState } from "react";
import { Image, User, Lock } from "lucide-react";
import Modal from "../Modal";
import ChangePhotoForm from "../Header/ChangePhotoForm";
import ChangeNameForm from "../Header/ChangeNameForm";
import ChangePasswordForm from "../Header/ChangePasswordForm";

export default function SidebarProfile() {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  return (
    <>
      <Modal
        open={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        title="Profil utilisateur"
      >
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setOpenProfileModal(false);
              setOpenPhotoModal(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Image size={18} /> Changer la photo
          </button>
          <button
            onClick={() => {
              setOpenProfileModal(false);
              setOpenNameModal(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <User size={18} /> Modifier le nom d’utilisateur
          </button>
          <button
            onClick={() => {
              setOpenProfileModal(false);
              setOpenPasswordModal(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Lock size={18} /> Changer le mot de passe
          </button>
        </div>
      </Modal>

      <Modal
        open={openPhotoModal}
        onClose={() => setOpenPhotoModal(false)}
        title="Changer la photo"
      >
        <ChangePhotoForm
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>

      <Modal
        open={openNameModal}
        onClose={() => setOpenNameModal(false)}
        title="Modifier le nom d’utilisateur"
      >
        <ChangeNameForm
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>

      <Modal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        title="Changer le mot de passe"
      >
        <ChangePasswordForm
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>
    </>
  );
}
