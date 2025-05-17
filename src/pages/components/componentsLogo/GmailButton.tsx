import styles from "../../../styles/components/componentsLogo/GmailButton.module.css";
import React, { useEffect, useState } from "react";

const GmailButton: React.FC = () => {
  const [emailInfo, setEmailInfo] = useState({ email: "" });

  useEffect(() => {
    fetch("http://localhost:8080/portfolio")
      .then((response) => response.json())
      .then((data) => {
        // Asegúrate de que `data.email` exista
        if (data.email) {
          setEmailInfo({ email: data.email });
        }
      })
      .catch((error) => console.error("Error fetching contact info:", error));
  }, []);

  return (
    <a
      href={`mailto:${emailInfo.email}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className={styles.GmailBtn}>
        <span className={styles.svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="24"
            height="24"
          >
            <path fill="#EA4335" d="M64 128l192 144L448 128v256H64z" />
            <path fill="#34A853" d="M64 128l192 144L256 384 64 256z" />
            <path fill="#4285F4" d="M448 128L256 272v112l192-128z" />
            <path fill="#FBBC05" d="M64 384V128l192 144z" />
          </svg>
        </span>
        <span className={styles.BG}></span>
      </button>
    </a>
  );
};

export default GmailButton;
