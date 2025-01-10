import React, { useState } from "react";
import Styles from "../../../styles/components/UpdateInformation.module.css";

interface UpdateInformationProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser?: (formData: { photo: string }) => void;
}

const FormPhoto: React.FC<UpdateInformationProps> = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({ photo: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Obtenemos el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photo = reader.result as string; // Convertimos el archivo a base64
        setFormData({ photo });
      };
      reader.readAsDataURL(file); // Leemos el archivo como base64
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.photo.trim() && onAddUser) {
      onAddUser({ photo: formData.photo });
      setFormData({ photo: "" });
      onClose(); // Cierra el modal después de enviar
    }
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button className={Styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={Styles.title}>Actualizar Foto</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label htmlFor="profilePicture" className={Styles.label}>
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleChange}
              className={Styles.fileInput}
              accept="image/*"
            />
          </div>
          <button type="submit" className={Styles.submitButton}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPhoto;
