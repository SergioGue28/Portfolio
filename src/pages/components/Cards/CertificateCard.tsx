import React from "react";
import Image from "next/image";
import styles from "../../../styles/components/cards/CertificateCard.module.css";

interface CertificateCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
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
      </div>
    </div>
  );
};

export default CertificateCard;
