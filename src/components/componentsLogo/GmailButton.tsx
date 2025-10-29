import styles from "../../styles/components/componentsLogo/GmailButton.module.css";
import React from "react";

const GmailButton: React.FC = () => {
  const handleOpenEmailClient = () => {
    const email = "sergioco2807@gmail.com"; // tu correo
    const subject = encodeURIComponent("Contacto desde portafolio");
    const body = encodeURIComponent("¡Hola! Me gustaría ponerme en contacto contigo.");

    // Abrir cliente de correo predeterminado
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <button className={styles.GmailBtn} onClick={handleOpenEmailClient}>
      <span className={styles.svgContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
          <path fill="#EA4335" d="M64 128l192 144L448 128v256H64z" />
          <path fill="#34A853" d="M64 128l192 144L256 384 64 256z" />
          <path fill="#4285F4" d="M448 128L256 272v112l192-128z" />
          <path fill="#FBBC05" d="M64 384V128l192 144z" />
        </svg>
      </span>
      <span className={styles.BG}></span>
    </button>
  );
};

export default GmailButton;
