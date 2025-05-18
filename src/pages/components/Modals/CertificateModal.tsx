import React from "react";
import styles from "../../../styles/components/Modals/CertificateModal.module.css";
import Image from "next/image";

interface CertificateModalProps {
  name: string;
  imageUrl: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  name,
  imageUrl,
  onClose,
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={name}
            width={600}
            height={400}
            className={styles.image}
          />
        </div>
        <h2 className={styles.certificateName}>{name}</h2>
      </div>
    </div>
  );
};

export default CertificateModal;
