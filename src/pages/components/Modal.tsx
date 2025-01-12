import { useState } from "react";

interface Modal {
  photo: string;
}

export const useHeaderState = ({ photo }: Modal) => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(photo || "/img/FOTO.jpg");

  // Funciones para manejar el modal de descripción
  const handleOpenDescriptionModal = () => setIsDescriptionModalOpen(true);
  const handleCloseDescriptionModal = () => setIsDescriptionModalOpen(false);
  const handleUpdateDescription = (newDescription: string) => setDescription(newDescription);

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState(
    "Programmer with 9 months of experience in the field of Backend development, in the creation and administration of REST APIs, facilitating system integration and communication between different platforms in a scalable and efficient way.Programmer with 9 months of experience in the field of Backend development, in the creation and administration of REST APIs, facilitating system integration and communication between different platforms in a scalable and efficient way.Programmer with 9 months of experience in the field of Backend development, in the creation and administration of REST APIs, facilitating system integration and communication between different platforms in a scalable and efficient way.Programmer with 9 months of experience in the field of Backend development, in the creation and administration of REST APIs, facilitating system integration and communication between different platforms in a scalable and efficient way."
  );


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
    handleUpdateDescription,
    isDescriptionModalOpen,
    setIsDescriptionModalOpen,
    handleCloseDescriptionModal,
    handleOpenDescriptionModal,
    description
  };
};
