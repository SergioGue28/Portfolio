import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../styles/ContactMe.module.css";

const ContactMe: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    position: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch("/api/portfolio/getPortfolio")
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error("Error fetching contact info:", error));
  }, []);

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>Contactáme</h2>
      <div className={styles.contactInfo}>
        <p>
          <strong>Nombre:</strong> {contactInfo.fullName}
        </p>
        <p>
          <strong>Título:</strong> {contactInfo.position}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contactInfo.email}`} className={styles.emailLink}>
            {contactInfo.email}
          </a>
        </p>
        <a
          href={`https://wa.me/57${contactInfo.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ContactMe;
