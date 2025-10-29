"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "../../../styles/components/animation/animationCard/CardsSection.module.css";

const CardsSection: React.FC = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Scroll relativo a la sección
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], 
  });

  // Animaciones
  const yProject = useTransform(scrollYProgress, [0, 0.5], ["0%", "-60%"]);
  const opacityProject = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleProject = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const yCertificate = useTransform(scrollYProgress, [0.5, 1], ["60%", "0%"]);
  const opacityCertificate = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const scaleCertificate = useTransform(scrollYProgress, [0.5, 1], [0.95, 1]);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.stickyContainer}>
        <motion.div
          className={styles.card}
          style={{ y: yProject, opacity: opacityProject, scale: scaleProject }}
          onClick={() => router.push("/Project")}
        >
          <h2 className={styles.title}>Proyectos</h2>
          <p className={styles.description}>
            Explora mis proyectos desarrollados con tecnologías modernas y
            enfoques innovadores.
          </p>
        </motion.div>

        <motion.div
          className={`${styles.card} ${styles.card2}`}
          style={{ y: yCertificate, opacity: opacityCertificate, scale: scaleCertificate }}
          onClick={() => router.push("./Certificate")}
        >
          <h2 className={styles.title}>Certificados</h2>
          <p className={styles.description}>
            Conoce los certificados que acreditan mi formación profesional y
            técnica en desarrollo de software.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CardsSection;