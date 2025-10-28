import React, { useState, useEffect } from "react";
import Styles from "../styles/Project.module.css";
import Title from "../components/Title";
import ProjectCard from "../components/Cards/ProjectCard";
import ProjectForm from "../components/Forms/ProjectForm";
import PaginationProject from "../components/Pagination/PaginationProject";

const Project: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<
    { name: string; description: string; url: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔹 Estado para autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Verificar autenticación con cookies
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // incluye cookies HttpOnly
        });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ Obtener proyectos
  useEffect(() => {
    fetch("/api/project/getProject")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  const handleAddProject = (project: {
    name: string;
    description: string;
    url: string;
  }) => {
    setProjects([...projects, project]);
    setIsModalOpen(false);
  };

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const displayedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={Styles.container}>
      <Title text="Proyectos" />

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : (
        <div className={Styles.containerCard}>
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              url={project.url}
            />
          ))}
        </div>
      )}

      <div className={Styles.containerButtonAggCard}>
        <div className={Styles.containerPagination}>
          <PaginationProject
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* ✅ Mostrar botón solo si el usuario está autenticado */}
        {isAuthenticated && (
          <div className={Styles.containerButton}>
            <button
              className={Styles.buttonAggCard}
              onClick={() => setIsModalOpen(true)}
            >
              Agregar proyecto
            </button>
          </div>
        )}
      </div>

      {/* Modal para formulario de nuevo proyecto */}
      {isModalOpen && (
        <ProjectForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddProject={handleAddProject}
        />
      )}
    </div>
  );
};

export default Project;
