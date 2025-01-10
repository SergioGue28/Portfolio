import { useState } from "react";

interface Modal {
  photo: string;
}

export const useHeaderState = ({ photo }: Modal) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(photo || "/img/FOTO.jpg");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleUpdatePhoto = (formData: { photo: string }) => {
    setProfilePhoto(formData.photo);
  };

  return {
    isModalOpen,
    profilePhoto,
    handleOpenModal,
    handleCloseModal,
    handleUpdatePhoto,
  };
};
