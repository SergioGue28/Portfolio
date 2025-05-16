import React, { useState } from "react";
import Styles from "../../../styles/components/Forms/ProjectForm.module.css";
import { toast } from "react-toastify";
import classNames from "classnames";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: { name: string; description: string; url: string }) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ isOpen, onClose, onAddProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !url) {
      toast.warning("Todos los campos son obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Sesión expirada. Inicia sesión nuevamente.");
      onClose();
      return;
    }

    const project = { name, description, url };
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/project/addProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast.success("Proyecto agregado correctamente.");
        onAddProject(project);
        // Limpiar campos después de agregar
        setName("");
        setDescription("");
        setUrl("");
        onClose();
      } else if (response.status === 401) {
        toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        onClose();
      } else {
        toast.error("Error al agregar el proyecto.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button className={Styles.closeButton} onClick={onClose} disabled={loading}>
          &times;
        </button>
        <h2 className={Styles.title}>Agregar Proyecto</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label htmlFor="name" className={Styles.label}>
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={Styles.input}
              disabled={loading}
            />
          </div>
          <div className={Styles.formGroup}>
            <label htmlFor="description" className={Styles.label}>
              Descripción
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={Styles.input}
              disabled={loading}
            />
          </div>
          <div className={Styles.formGroup}>
            <label htmlFor="url" className={Styles.label}>
              URL del Proyecto
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={Styles.input}
              disabled={loading}
            />
          </div>
          <div className={Styles.formGroupButton}>
            <button type="submit" className={Styles.button} disabled={loading}>
              {loading ? "Guardando..." : "Agregar Proyecto"}
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

export default ProjectForm;
