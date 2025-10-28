import React from "react";
import Styles from "../../styles/components/Footer.module.css";
import classNames from "classnames";
import Link from "next/link";
import GitHubButton from "../componentsLogo/GitHubButton";
import LinkedInButton from "../componentsLogo/LinkedInButton";
import WhatsAppButton from "../componentsLogo/GmailButton";

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}>
      <section className={Styles.containerFooter}>
        <div className={Styles.nameFooter}>Ingeniero Informático</div>

        <section className={Styles.containerElement}>
          <Link
            href="/Home"
            className={classNames(Styles.buttonFooter, Styles.home)}
          >
            Inicio
          </Link>
          <Link
            href="/ContactMe"
            className={classNames(Styles.buttonFooter, Styles.contactUs)}
          >
            Contáctame
          </Link>
        </section>

        <section className={Styles.ContainerSocial}>
          <WhatsAppButton />
          <LinkedInButton />
          <GitHubButton />
        </section>

        <section className={Styles.Containerline}>
          <hr className={Styles.line} />
        </section>

        <div className={Styles.logo}>
          <p>
            Para más información, haz clic en Contáctame o toca el icono de Correo electrónico.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
