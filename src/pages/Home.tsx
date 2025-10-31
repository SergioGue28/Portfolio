import { useEffect, useState } from "react";
import Styles from "../styles/Home.module.css";
import ProfileMedia from "../components/ProfileMedia";
import Particles from "../components/animation/animationBackground/Particles";
import SplitText from "../components/animation/animationText/SplitText";
import React from "react";
import CardsSection from "../components/animation/animationCard/CardsSection";

import {
  FaNodeJs,
  FaReact,
  FaRust,
  FaJava,
  FaJsSquare,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiExpress,
  SiActix,
  SiHibernate,
  SiApachemaven,
  SiMongodb,
  SiMysql,
  SiAmazonecs,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

interface PortfolioData {
  fullName: string;
  position: string;
  description: string;
  photo: string;
}

const Home: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch("/api/portfolio/getPortfolio");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <nav className={Styles.nav}>
      {/* Fondo animado */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#000000"]}
          particleCount={50}
          particleSpread={8}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className={Styles.space}></div>

      <section className={Styles.home} id="profile-section">
        <div className={Styles.photo}>
          {loading ? (
            <p className={Styles.contex}>Cargando imagen...</p>
          ) : (
            <ProfileMedia
              imageSrc={
                portfolio?.photo?.startsWith("http")
                  ? portfolio.photo
                  : "/img/3.jpg"
              }
            />
          )}
        </div>

        <div className={Styles.text}>
          <div className={Styles.contexTitle}>
            <SplitText
              text={portfolio?.fullName || "Cargando datos..."}
              className={Styles.textTitleOcupationName}
              delay={200}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
            />

            <SplitText
              text={portfolio?.position || "Cargando... ⏳"}
              className={Styles.textTitleOcupationName}
              delay={300}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
            />
          </div>

          <div className={Styles.contex}>
            <SplitText
              text={portfolio?.description || "Cargando... ⏳"}
              className={Styles.animatedText}
              delay={10}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />
          </div>
        </div>
      </section>

      <div id="about" className={Styles.tittleCard}>
        <div className={Styles.textTitle}>ACERCA DE</div>
      </div>

      <CardsSection />

      <div id="tech" className={Styles.tittleCard}>
        <div className={Styles.textTitle}>TECNOLOGÍAS</div>
      </div>

      <section>
        <div className={Styles.technologiesContainer}>
          <h4>Backend</h4>
          <div className={Styles.techRow}>
            <div className={Styles.techItem}>
              <FaNodeJs /> <span>Node.js</span>
            </div>
            <div className={Styles.techItem}>
              <SiExpress /> <span>Express</span>
            </div>
            <div className={Styles.techItem}>
              <FaRust /> <span>Rust</span>
            </div>
            <div className={Styles.techItem}>
              <SiActix /> <span>Actix-Web</span>
            </div>
            <div className={Styles.techItem}>
              <FaJava /> <span>Java</span>
            </div>
            <div className={Styles.techItem}>
              <SiHibernate /> <span>Hibernate</span>
            </div>
            <div className={Styles.techItem}>
              <SiApachemaven /> <span>Maven</span>
            </div>
            <div className={Styles.techItem}>
              <SiMongodb /> <span>MongoDB</span>
            </div>
            <div className={Styles.techItem}>
              <SiMysql /> <span>MySQL</span>
            </div>
          </div>

          <h4>Frontend</h4>
          <div className={Styles.techRow}>
            <div className={Styles.techItem}>
              <FaJsSquare /> <span>JavaScript</span>
            </div>
            <div className={Styles.techItem}>
              <FaReact /> <span>React.js</span>
            </div>
            <div className={Styles.techItem}>
              <TbBrandNextjs /> <span>Next.js</span>
            </div>
          </div>

          <h4>Otras</h4>
          <div className={Styles.techRow}>
            <div className={Styles.techItem}>
              <FaDocker /> <span>Docker</span>
            </div>
            <div className={Styles.techItem}>
              <FaAws /> <span>AWS S3</span>
            </div>
            <div className={Styles.techItem}>
              <SiAmazonecs /> <span>ECS</span>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Home;
