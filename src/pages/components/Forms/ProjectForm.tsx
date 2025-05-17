import React, { useState } from "react";
import Styles from "../../../styles/components/Forms/ProjectForm.module.css";
import { toast } from "react-toastify";
import classNames from "classnames";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: {
    name: string;
    description: string;
    url: string;
  }) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !url) {
      toast.warning("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
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
        toast.success("Project added successfully.");
        onAddProject(project);
        // Limpiar campos después de agregar
        setName("");
        setDescription("");
        setUrl("");
        onClose();
      } else if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        onClose();
      } else {
        toast.error("Error adding project.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error("Error connecting to the server.");
    } finally {
      setLoading(false);
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
        <h2 className={Styles.title}>Add Project</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label htmlFor="name" className={Styles.label}>
              Project Name
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
              Project URL
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
              {loading ? "Saving..." : "Add Project"}
            </button>
            <button
              type="button"
              className={classNames(Styles.button, Styles.cancelButton)}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
