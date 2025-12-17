import React from "react";
import TiltedCard from "./animation/animationPhoto/TiltedCard";
import styles from "../styles/components/ProfileMedia.module.css";

const ProfileMedia: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <div className={styles.mediaContainer}>
      <div className={styles.profileImageWrapper}>
        <TiltedCard
          imageSrc={imageSrc}
          altText="Foto de perfil"
          containerHeight="450px"
          containerWidth="400px"
          imageHeight="400px"
          imageWidth="350px"
          scaleOnHover={1.15}
          rotateAmplitude={14}
          showMobileWarning={false}
          showTooltip={false}
        />
      </div>
    </div>
  );
};

export default ProfileMedia;