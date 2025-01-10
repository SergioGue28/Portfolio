import Styles from "../styles/Certificate.module.css";
import Tittle from "./components/Title";
import CertificateCard from "./components/CertificateCard";
import UpdateInformation from "./components/UpdateInformation";
import { useState } from "react";

const Certificate: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const certificates = [
    { name: "Certificate 1", imageUrl: "/images/certificate1.jpg" },
    { name: "Certificate 2", imageUrl: "/images/certificate2.jpg" },
    { name: "Certificate 3", imageUrl: "/images/certificate3.jpg" },
  ];

  return (
    <nav className={Styles.nav}>
      <Tittle text="Certificate" />
      <section className={Styles.certificate}>
        <div className={Styles.containerCertificate}>
          {certificates.map((cert, index) => (
            <CertificateCard key={index} name={cert.name} imageUrl={cert.imageUrl} />
          ))}
        </div>

        <div className={Styles.containerButtonAggCard}>
          <div>
            <button className={Styles.buttonAggCard} onClick={handleOpenModal}>
              Agg Certificate
            </button>
            <UpdateInformation isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Certificate;
