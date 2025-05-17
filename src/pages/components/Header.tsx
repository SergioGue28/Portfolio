import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Styles from "../../styles/components/Header.module.css";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import UpdateInformation from "./Forms/UpdateInformation";
import { scroller } from "react-scroll";
import GitHubButton from "./componentsLogo/GitHubButton";
import LinkedInButton from "./componentsLogo/LinkedInButton";
import WhatsAppButton from "./componentsLogo/GmailButton";
import ModalMenu from "../components/Modals/ModalMenu";
import ChangePassword from "./Forms/ChangePassword";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setHasToken(Boolean(token));
    }
  }, []);

  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  const handleOpenPasswordModal = () => {
    setPasswordModalOpen(true);
    setMenuOpen(false); // Cierra el menú
  };
  const handleClosePasswordModal = () => setPasswordModalOpen(false);

  const handleAboutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (router.pathname === "/Home") {
      scroller.scrollTo("about", {
        smooth: true,
        duration: 1000,
      });
    } else {
      router.push("/Home#about");
    }
  };

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className={Styles.header}>
      <section className={Styles.containerHeader}>
        <div
          className={classNames(Styles.contentHeader, Styles.containerSocial)}
        >
          <WhatsAppButton />
          <LinkedInButton />
          <GitHubButton />
        </div>

        <div
          className={classNames(Styles.contentHeader, Styles.containerSearch)}
        >
          <button
            className={classNames(Styles.buttonHeader, Styles.about)}
            onClick={handleAboutClick}
          >
            About
          </button>
          <Link
            href="/Home"
            className={classNames(Styles.buttonHeader, Styles.project)}
          >
            <button className={classNames(Styles.buttonHeader, Styles.project)}>
              Home
            </button>
          </Link>
          <Link
            href="./ContactMe"
            className={classNames(Styles.buttonHeader, Styles.certificate)}
          >
            <button
              className={classNames(Styles.buttonHeader, Styles.certificate)}
            >
              Contact me
            </button>
          </Link>
        </div>

        <div
          className={classNames(Styles.contentHeader, Styles.containerProfile)}
        >
          <button className={Styles.btnProfile}>Sergio Guerra</button>

          {hasToken ? (
            <Image
              src="/img/menu.png"
              alt="Foto de perfil"
              width={30}
              height={30}
              className={Styles.profilePicture}
              onClick={toggleMenu}
              priority
            />
          ) : (
            <div className={Styles.tooltipWrapper}>
              <Image
                src="/img/menu.png"
                alt="Sin permisos"
                width={30}
                height={30}
                className={Styles.profilePictureDisabled}
                priority
              />
              <span className={Styles.tooltipText}>
                Only the administrator has permission to edit the information.
              </span>
            </div>
          )}

          {isMenuOpen && hasToken && (
            <ModalMenu
              onEditUser={() => {
                handleOpenModal();
                setMenuOpen(false);
              }}
              onChangePassword={handleOpenPasswordModal}
            />
          )}
        </div>
      </section>
      <UpdateInformation isOpen={isModalOpen} onClose={handleCloseModal} />
      <ChangePassword
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
      />
    </header>
  );
};

export default Header;
