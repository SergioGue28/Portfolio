import React from "react";
import styles from "../../styles/components/cards/ProjectCard.module.css";

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  url,
}) => {
  const openRoute = () => {
    const fullUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div onClick={openRoute} className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <p className={styles.title}>Project</p>
          <p>{name}</p>
        </div>
        <div className={styles.flipCardBack}>
          <p className={styles.title}>Description</p>
          <p className={`${styles.ellipsisText} ${styles.multiLineEllipsis}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
