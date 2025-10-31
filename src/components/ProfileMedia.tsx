import React, { useEffect, useRef, useState } from "react";
import TiltedCard from "./animation/animationPhoto/TiltedCard";

const ProfileMedia: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Detectar visibilidad en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 } // visible al menos 50%
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔹 Alternar imagen y video cada 10s solo si está visible
  useEffect(() => {
    if (!isVisible) {
      setShowVideo(false); // si no está visible, muestra la imagen
      return;
    }

    const interval = setInterval(() => {
      setShowVideo((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
      {showVideo ? (
        <video
          src="/videoProfile.mp4"
          width="400"
          height="500"
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={() => setShowVideo(false)}
          style={{
            borderRadius: "20px",
            objectFit: "cover",
            width: "400px",
            height: "500px",
          }}
        />
      ) : (
        <TiltedCard
          imageSrc={imageSrc}
          altText="Foto de perfil"
          containerHeight="450px"
          containerWidth="400px"
          imageHeight="450px"
          imageWidth="400px"
          scaleOnHover={1.15}
          rotateAmplitude={14}
          showMobileWarning={false}
          showTooltip={false}
        />
      )}
    </div>
  );
};

export default ProfileMedia;
