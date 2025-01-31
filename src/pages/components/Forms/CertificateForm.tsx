import React, { useState } from "react";
import Styles from "../../../styles/components/Forms/CertificateForm.module.css";
import classNames from "classnames";

interface AddCertificateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCertificate: (certificate: { name: string; imageUrl: string }) => void;
}

const CertificateForm: React.FC<AddCertificateFormProps> = ({ isOpen, onClose, onAddCertificate }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Por favor, ingresa el nombre y selecciona una imagen.");
      return;
    }

    const imageUrl = URL.createObjectURL(image); // Simulación de carga de imagen

    onAddCertificate({ name, imageUrl });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button className={Styles.closeButton} onClick={onClose} disabled={loading}>
          &times;
        </button>
        <h2 className={Styles.title}>Agregar Certificado</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label htmlFor="certificateImage" className={Styles.label}>
              Imagen del Certificado
            </label>
            <input
              type="file"
              id="certificateImage"
              onChange={handleFileChange}
              className={Styles.fileInput}
              disabled={loading}
            />
          </div>

          <div className={Styles.formGroup}>
            <label htmlFor="name" className={Styles.label}>Nombre del Certificado</label>
            <input
              type="text"
              id="name"
              placeholder="Ejemplo: Curso de React"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={Styles.input}
              disabled={loading}
            />
          </div>

          <div className={Styles.formGroupButton}>
            <button type="submit" className={Styles.button} disabled={loading}>
              {loading ? "Guardando..." : "Agregar Certificado"}
            </button>
            <button
              type="button"
              className={classNames(Styles.button, Styles.cancelButton)}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;
