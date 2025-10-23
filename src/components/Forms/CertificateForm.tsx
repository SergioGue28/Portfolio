import React, { useState } from "react";
import Styles from "../../styles/components/Forms/CertificateForm.module.css";
import classNames from "classnames";
import { toast } from "react-toastify";

interface AddCertificateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCertificate: (certificate: { name: string; imageUrl: string }) => void;
}

const CertificateForm: React.FC<AddCertificateFormProps> = ({
  isOpen,
  onClose,
  onAddCertificate,
}) => {
  const [name, setCertificateName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !image) {
      toast.warning("Please enter your name and select an image.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      onClose();
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await fetch(
        "https://portfoliobackend-aay8.onrender.com/certificate/addCertificate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Certificate added successfully.");
        onAddCertificate({ name, imageUrl: result.imageUrl });
        onClose();
      } else if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        onClose();
      } else {
        toast.error("Error uploading certificate.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button
          className={Styles.closeButton}
          onClick={onClose}
          disabled={loading}
        >
          &times;
        </button>
        <h2 className={Styles.title}>Añadir Certificado</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label htmlFor="certificateImage" className={Styles.label}>
              Imagen
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
            <label htmlFor="name" className={Styles.label}>
              Nombre
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ejemplo: React Course"
              value={name}
              onChange={(e) => setCertificateName(e.target.value)}
              className={Styles.input}
              disabled={loading}
            />
          </div>

          <div className={Styles.formGroupButton}>
            <button type="submit" className={Styles.button} disabled={loading}>
              {loading ? "Saving..." : "Añadir Certificado"}
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
