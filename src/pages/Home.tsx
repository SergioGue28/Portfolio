import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "../styles/Home.module.css";
import Image from "next/image";
import classNames from "classnames";

interface PortfolioData {
  fullName: string;
  position: string;
  description: string;
  photo: string;
}

const Home: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/portfolio")
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

        <div className={classNames(Styles.text, Styles.fadeIn)}>
          <div className={Styles.contexTitle}>
            <span className={Styles.textTitleOcupationColor}>Hi this's </span>
            <span className={Styles.textTitleOcupationName}>
              {portfolio?.fullName || "loading data..."}
            </span>
            <br />
            <span className={Styles.textTitleOcupationName}>
              {portfolio?.position || "loading..."}
            </span>
          </div>

          <div className={Styles.contex}>
            {portfolio?.description || "Loading description..."}
          </div>
        </div>
      </section>

      <div id="about" className={classNames(Styles.tittleCard, Styles.fadeIn)}>
        <div className={Styles.textTitle}>ABOUT</div>
      </div>

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
          href="./certificate"
          className={classNames(
            Styles.card,
            Styles.cardCertificate,
            Styles.certificateFadeIn
          )}
        >
          <Image
            src="/img/liam-truong-htpU_wGEcW0-unsplash.JPG"
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
