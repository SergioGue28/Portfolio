import React, { useState } from "react";
import Styles from "../../../styles/components/UpdateInformation.module.css";

interface UpdateInformationProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDescription?: (description: string, fontSize: string, color: string) => void;
}

const FormDescription: React.FC<UpdateInformationProps> = ({ isOpen, onClose, onAddDescription }) => {
  const [description, setDescription] = useState("");
  const [fontSize, setFontSize] = useState("16px"); // Tamaño del texto
  const [color, setColor] = useState("#000000"); // Color del texto

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.trim() && onAddDescription) {
      onAddDescription(description, fontSize, color);
      setDescription("");
      setFontSize("16px");
      setColor("#000000");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button className={Styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={Styles.title}>Actualizar Descripción</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label htmlFor="description" className={Styles.label}>
              Descripción
            </label>
            <textarea
              id="description"
              placeholder="Escribe sobre ti..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={Styles.textarea}
              maxLength={1000}
              style={{ fontSize, color }} // Estilos dinámicos
            ></textarea>
            <small className={Styles.charCount}>{description.length + "/1000"}</small>
          </div>

      

          <button type="submit" className={Styles.submitButton}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormDescription;
