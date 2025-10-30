import React, { useEffect, useState } from "react";
import Styles from "../styles/Certificate.module.css";
import CertificateCard from "../components/Cards/CertificateCard";
import CertificateForm from "../components/Forms/CertificateForm";
import PaginationProject from "../components/Pagination/PaginationProject";
import Tittle from "../components/Title";
import CertificateModal from "../components/Modals/CertificateModal";
import { toast } from "react-toastify";

const Certificate: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedCertificate, setSelectedCertificate] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);

  // ✅ Verificar autenticación por cookies
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
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

  // ✅ Obtener certificados
  useEffect(() => {
    fetch("/api/certificate/getCertificates")
      .then((response) => response.json())
      .then((data) => {
        // 🔹 Mapea los datos para que cada certificado tenga un campo "id"
        const mapped = data.map((cert: any) => ({
          id: cert._id, // <- aquí transformamos
          name: cert.name,
          imageUrl: cert.imageUrl,
        }));
        setCertificates(mapped);
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

  const handleCloseModal = () => setSelectedCertificate(null);

  const handleAddCertificate = (newCertificate: {
    id: string;
    name: string;
    imageUrl: string;
  }) => {
    setCertificates((prev) => [...prev, newCertificate]);
  };

  // ✅ Eliminar certificado
  const handleDeleteCertificate = async (id: string) => {
  if (!confirm("¿Seguro que quieres eliminar este certificado?")) return;

  try {
    const res = await fetch(`/api/certificate/deleteCertificate/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Certificado eliminado correctamente.");
      setCertificates((prev) => prev.filter((c) => c.id !== id));
    } else {
      toast.error("Error al eliminar el certificado.");
    }
  } catch (error) {
    console.error("Error eliminando certificado:", error);
    toast.error("Error de conexión con el servidor.");
  }
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
          {displayedCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              id={cert.id}
              name={cert.name}
              imageUrl={cert.imageUrl}
              onClick={() => handleCardClick(cert)}
              onDelete={handleDeleteCertificate}
              isAuthenticated={isAuthenticated}
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

        {isAuthenticated && (
          <div className={Styles.containerButton}>
            <button
              className={Styles.buttonAggCard}
              onClick={handleOpenFormModal}
            >
              Añadir Certificado
            </button>

            <CertificateForm
              isOpen={isModalOpen}
              onClose={handleCloseFormModal}
              onAddCertificate={handleAddCertificate}
            />
          </div>
        )}
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
