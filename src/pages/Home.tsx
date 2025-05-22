import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "../styles/Home.module.css";
import Image from "next/image";
import classNames from "classnames";
import Loader from "./components/Loader";
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
              width={400}
              height={450}
              className={classNames(Styles.profilePicture, Styles.fadeIn)}
              priority
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>

        {/* Reemplazo del texto por el loader */}
        {!portfolio ? (
          <Loader />
        ) : (
          <div className={classNames(Styles.text, Styles.fadeIn)}>
            <div className={Styles.contexTitle}>
              <span className={Styles.textTitleOcupationColor}>Hi this's </span>
              <span className={Styles.textTitleOcupationName}>
                {portfolio.fullName}
              </span>
              <br />
              <span className={Styles.textTitleOcupationName}>
                {portfolio.position}
              </span>
            </div>
            <div className={Styles.contex}>{portfolio.description}</div>
          </div>
        )}
      </section>

      <section className={Styles.containerCard}>
        <Link
          href="./project"
          className={classNames(
            Styles.card,
            Styles.cardProject,
            Styles.projectFadeIn
          )}
        >
          <Image
            src="/img/nubelson-fernandes-UcYBL5V0xWQ-unsplash.jpg"
            alt="Settings Icon"
            width={450}
            height={450}
            className={classNames(Styles.imgcard, Styles.imgcardProject)}
            priority
          />
          <div className={Styles.textOverlay}>
            <h3 className={Styles.title}>All Projects</h3>
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
            width={450}
            height={450}
            className={classNames(Styles.imgcard, Styles.imgcardCertificate)}
            priority
          />
          <div className={Styles.textOverlay}>
            <h3 className={Styles.title}>Certificates</h3>
          </div>
        </Link>
      </section>
    </nav>
  );
};

export default Home;
