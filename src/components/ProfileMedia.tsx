import React, { useEffect, useRef, useState } from "react";
import TiltedCard from "./animation/animationPhoto/TiltedCard";

const ProfileMedia: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Detectar visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔹 Controlar duración (20s imagen / 5s video)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const cycleMedia = () => {
      if (!isVisible) {
        setShowVideo(false);
        return;
      }

      // Mostrar imagen 20s
      setShowVideo(false);
      timeoutId = setTimeout(() => {
        if (isVisible) {
          setShowVideo(true);

          // Mostrar video 5s
          timeoutId = setTimeout(() => {
            setShowVideo(false);
            cycleMedia(); // reiniciar ciclo
          }, 5000);
        }
      }, 20000);
    };

    cycleMedia();
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  return (
    <div ref={sectionRef}>
      {showVideo ? (
        <video
          src="/videoProfile.mp4"
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={() => setShowVideo(false)}
        />
      ) : (
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
      )}
    </div>
  );
};

export default ProfileMedia;
