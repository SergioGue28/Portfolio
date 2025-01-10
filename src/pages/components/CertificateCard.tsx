import React from 'react';
import Image from 'next/image';
import styles from '../../styles/components/CertificateCard.module.css';

interface CertificateCardProps {
  name: string;
  imageUrl: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ name, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
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
