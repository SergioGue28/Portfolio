import React, { useState } from "react";
import Styles from "../styles/Certificate.module.css";
import Tittle from "./components/Title";
import CertificateCard from "./components/CertificateCard";
import CertificateForm from "./components/Forms/CertificateForm";

const Certificate: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [certificates, setCertificates] = useState([
    { name: "Certificate 1", imageUrl: "/img/diploma-java-spring-1.png" },
    { name: "Certificate 2", imageUrl: "/img/diploma-java-spring-1.png" }
  ]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddCertificate = (newCertificate: { name: string; imageUrl: string }) => {
    setCertificates([...certificates, newCertificate]);
  };

  return (
    <nav className={Styles.nav}>
      <Tittle text="Certificados" />
    
      <div className={Styles.containerCertificate}>
        {certificates.map((cert, index) => (
          <CertificateCard key={index} name={cert.name} imageUrl={cert.imageUrl} />
        ))}
      </div>

      <div className={Styles.containerButtonAggCard}>
        <button className={Styles.buttonAggCard} onClick={handleOpenModal}>
          Agg Certificate
        </button>
        <CertificateForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddCertificate={handleAddCertificate}
        />
      </div>
    </nav>
  );
};

export default Certificate;
