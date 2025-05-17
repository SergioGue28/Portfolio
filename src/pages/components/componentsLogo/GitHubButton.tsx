import React from "react";
import styles from "../../../styles/components/componentsLogo/GitHubButton.module.css";

const GitHubButton: React.FC = () => {
  return (
    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
      <button className={styles.GitHubBtn}>
        <span className={styles.svgContainer}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="white"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.547-1.387-1.337-1.757-1.337-1.757-1.091-.745.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.304 3.495.997.108-.776.42-1.304.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.267 1.984-.4 3.005-.405 1.02.005 2.048.138 3.005.405 2.292-1.552 3.3-1.23 3.3-1.23.652 1.652.24 2.873.117 3.176.767.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.478 5.92.43.372.823 1.103.823 2.222v3.293c0 .322.193.694.8.576 4.77-1.585 8.207-6.083 8.207-11.385 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </span>
        <span className={styles.BG}></span>
      </button>
    </a>
  );
};

export default GitHubButton;
