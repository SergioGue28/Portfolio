import React, { useState } from "react";
import Styles from "../../../styles/components/UpdateInformation.module.css";

interface UpdateInformationProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDescription?: (description: string) => void;
}

const FormDescription: React.FC<UpdateInformationProps> = ({ isOpen, onClose, onAddDescription }) => {
  const [description, setDescription] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.trim() && onAddDescription) {
      onAddDescription(description);
      setDescription("");
      
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