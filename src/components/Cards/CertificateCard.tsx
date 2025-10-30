import React from "react";
import Image from "next/image";
import styles from "../../styles/components/cards/CertificateCard.module.css";

interface CertificateCardProps {
  id: string;
  name: string;
  imageUrl: string;
  onClick: () => void;
  onDelete?: (id: string) => void;
  isAuthenticated?: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  id,
  name,
  imageUrl,
  onClick,
  onDelete,
  isAuthenticated,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper} onClick={onClick}>
        <Image
          src={imageUrl}
          alt={name}
          width={250}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.certificateName}>{name}</h3>

        {isAuthenticated && (
          <button
            onClick={() => onDelete && onDelete(id)}
            className={styles.deleteButton}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
