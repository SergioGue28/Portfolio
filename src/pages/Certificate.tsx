import React, { useEffect, useState } from "react";
import Styles from "../styles/Certificate.module.css";
import CertificateCard from "./components/Cards/CertificateCard";
import CertificateForm from "./components/Forms/CertificateForm";
import PaginationProject from "./components/Pagination/PaginationProject";
import Tittle from "./components/Title";
import CertificateModal from "./components/Modals/CertificateModal";

const Certificate: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para token
  const [token, setToken] = useState<string | null>(null);

  // Estado para el certificado seleccionado
  const [selectedCertificate, setSelectedCertificate] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    fetch("https://portfoliobackend-aay8.onrender.com/certificate")
      .then((response) => response.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenFormModal = () => setModalOpen(true);
  const handleCloseFormModal = () => setModalOpen(false);

  const handleCardClick = (certificate: { name: string; imageUrl: string }) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const handleAddCertificate = (newCertificate: {
    name: string;
    imageUrl: string;
  }) => {
    setCertificates([...certificates, newCertificate]);
  };

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const displayedCertificates = certificates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={Styles.container}>
      <Tittle text="Certificados" />

      {loading ? (
        <p>Cargando Certificados...</p>
      ) : (
        <div className={Styles.containerCard}>
          {displayedCertificates.map((cert, index) => (
            <CertificateCard
              key={index}
              name={cert.name}
              imageUrl={cert.imageUrl}
              onClick={() => handleCardClick(cert)}
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

        <div className={Styles.containerButton}>
          {/* Mostrar botón solo si token existe */}
          {token && (
            <button
              className={Styles.buttonAggCard}
              onClick={handleOpenFormModal}
            >
              Añadir Certificado
            </button>
          )}

          <CertificateForm
            isOpen={isModalOpen}
            onClose={handleCloseFormModal}
            onAddCertificate={handleAddCertificate}
          />
        </div>
      </div>

      {selectedCertificate && (
        <CertificateModal
          name={selectedCertificate.name}
          imageUrl={selectedCertificate.imageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Certificate;
