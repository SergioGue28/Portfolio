import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "../styles/Home.module.css";
import Image from "next/image";
import classNames from "classnames";
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

  useEffect(() => {
    fetch("https://portfoliobackend-aay8.onrender.com/portfolio")
      .then((response) => response.json())
      .then((data) => setPortfolio(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <nav className={Styles.nav}>
      <section className={classNames(Styles.home, Styles.fadeIn)}>
        <div className={classNames(Styles.photo, Styles.fadeIn)}>
          {portfolio?.photo ? (
            <Image
              src={portfolio.photo}
              alt="Foto de perfil"
              width={350}
              height={400}
              className={classNames(Styles.profilePicture, Styles.fadeIn)}
              priority
            />
          ) : (
            <p className={Styles.contex}>Loading image...</p>
          )}
        </div>

        <div className={classNames(Styles.text, Styles.fadeIn)}>
          <div className={Styles.contexTitle}>
            <span className={Styles.textTitleOcupationColor}>Hola soy </span>
            <span className={Styles.textTitleOcupationName}>
              {portfolio?.fullName || "Cargando datos..."}
            </span>
            <br />
            <span className={Styles.textTitleOcupationName}>
              {portfolio?.position || "Cargando... ⏳⏳"}
            </span>
          </div>

          <div className={Styles.contex}>
            {portfolio?.description ||
              "Agradecemos tu paciencia. Debido a que el servidor opera en la versión gratuita de Render, puede experimentar un arranque en frío (cold start) tras 20 minutos de inactividad. Esto resulta en una carga inicial de aproximadamente 1 minuto, únicamente en el primer acceso.😅"}
          </div>
        </div>
      </section>
      <div id="about" className={classNames(Styles.tittleCard, Styles.fadeIn)}>
        <div className={Styles.textTitle}>TECNOLOGÍAS</div>
      </div>
      <section>
        <div className={Styles.technologiesContainer}>
          <h4 className={Styles.tittleIcon}>Backend</h4>
          <div className={Styles.techRow}>
            <div className={Styles.techItem}>
              {/* Usamos un ícono de ejemplo para cada tecnología */}
              <FaNodeJs className={Styles.techIcon} />
              <span>Node.js</span>
            </div>
            <div className={Styles.techItem}>
              <SiExpress className={Styles.techIcon} />
              <span>Express</span>
            </div>
            <div className={Styles.techItem}>
              <FaRust className={Styles.techIcon} />
              <span>Rust</span>
            </div>
            <div className={Styles.techItem}>
              <SiActix className={Styles.techIcon} />
              <span>Actix-Web</span>
            </div>
            <div className={Styles.techItem}>
              <FaJava className={Styles.techIcon} />
              <span>Java</span>
            </div>
            <div className={Styles.techItem}>
              <SiHibernate className={Styles.techIcon} />
              <span>Hibernate</span>
            </div>
            <div className={Styles.techItem}>
              <SiApachemaven className={Styles.techIcon} />
              <span>Maven</span>
            </div>
            <div className={Styles.techItem}>
              <SiMongodb className={Styles.techIcon} />
              <span>MongoDB</span>
            </div>
            <div className={Styles.techItem}>
              <SiMysql className={Styles.techIcon} />
              <span>MySQL</span>
            </div>
          </div>

          <h4 className={Styles.tittleIcon}>Frontend</h4>
          <div className={Styles.techRow}>
            <div className={Styles.techItem}>
              <FaJsSquare className={Styles.techIcon} />
              <span>JavaScript</span>
            </div>
            <div className={Styles.techItem}>
              <FaReact className={Styles.techIcon} />
              <span>React.js</span>
            </div>
            <div className={Styles.techItem}>
              <TbBrandNextjs className={Styles.techIcon} />
              <span>Next.js</span>
            </div>
          </div>

          <h4 className={Styles.tittleIcon}>Otras</h4>
          <div className={Styles.techRow}>
            <div className={Styles.techItem}>
              <FaDocker className={Styles.techIcon} />
              <span>Docker</span>
            </div>
            <div className={Styles.techItem}>
              <FaAws className={Styles.techIcon} />
              <span>AWS S3</span>
            </div>
            <div className={Styles.techItem}>
              <SiAmazonecs className={Styles.techIcon} />
              <span>ECS</span>
            </div>
          </div>
        </div>
      </section>

      <div id="about" className={classNames(Styles.tittleCard, Styles.fadeIn)}>
        <div className={Styles.textTitle}>ACERCA DE</div>
      </div>

      <section className={Styles.containerCard}>
        <Link
          href="./Project"
          className={classNames(
            Styles.card,
            Styles.cardProject,
            Styles.projectFadeIn
          )}
        >
          <Image
            src="/img/nubelson-fernandes-UcYBL5V0xWQ-unsplash.jpg"
            alt="Settings Icon"
            width={520}
            height={450}
            className={classNames(Styles.imgcard, Styles.imgcardProject)}
            priority
          />
          <div className={Styles.textOverlay}>
            <h3 className={Styles.title}>Proyectos</h3>
          </div>
        </Link>

        <Link
          href="./Certificate"
          className={classNames(
            Styles.card,
            Styles.cardCertificate,
            Styles.certificateFadeIn
          )}
        >
          <Image
            src="/img/liam-truong-htpU_wGEcW0-unsplash.jpg"
            alt="Certificates"
            width={520}
            height={450}
            className={classNames(Styles.imgcard, Styles.imgcardCertificate)}
            priority
          />
          <div className={Styles.textOverlay}>
            <h3 className={Styles.title}>Certificados</h3>
          </div>
        </Link>
      </section>
    </nav>
  );
};

export default Home;
