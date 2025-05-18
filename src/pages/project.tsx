import React, { useState, useEffect } from "react";
import Styles from "../styles/Project.module.css";
import Title from "./components/Title";
import ProjectCard from "./components/Cards/ProjectCard";
import ProjectForm from "./components/Forms/ProjectForm";
import PaginationProject from "./components/Pagination/PaginationProject";

const Project: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<
    { name: string; description: string; url: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para el token
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    fetch("https://portfoliobackend-aay8.onrender.com/project")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
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
      <Title text="Projects" />
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

      <div className={Styles.containerButtonAggCard}>
        <div className={Styles.containerPagination}>
          <PaginationProject
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className={Styles.containerButton}>
          {/* Mostrar botón solo si token existe */}
          {token && (
            <button
              className={Styles.buttonAggCard}
              onClick={() => setIsModalOpen(true)}
            >
              Add Project
            </button>
          )}
        </div>
      </div>

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
