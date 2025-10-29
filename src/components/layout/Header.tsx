import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Styles from "../../styles/components/Header.module.css";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import UpdateInformation from "../Forms/UpdateInformation";
import ChangePassword from "../Forms/ChangePassword";
import ModalMenu from "../Modals/ModalMenu";
import { scroller } from "react-scroll";
import GitHubButton from "../componentsLogo/GitHubButton";
import LinkedInButton from "../componentsLogo/LinkedInButton";
import GmailButton from "../componentsLogo/GmailButton";
import WhatsAppButton from "../componentsLogo/WhatsAppButton";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        setScrollUp(true); // Subiendo
      } else {
        setScrollUp(false); // Bajando
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verificar sesión
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  const handleOpenPasswordModal = () => {
    setPasswordModalOpen(true);
    setMenuOpen(false);
  };
  const handleClosePasswordModal = () => setPasswordModalOpen(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // 👈 importante para eliminar cookie del servidor
      });

      setIsAuthenticated(false);
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleAboutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (router.pathname === "/Home") {
      scroller.scrollTo("about", { smooth: true, duration: 1000 });
    } else {
      router.push("/Home#about");
    }
  };

  return (
    <header
      className={Styles.header}
      style={{
        transform: scrollUp ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <section className={Styles.containerHeader}>
        <div
          className={classNames(Styles.contentHeader, Styles.containerSocial)}
        >
          <GmailButton />
          <LinkedInButton />
          <GitHubButton />
          <WhatsAppButton />
        </div>

        <div
          className={classNames(Styles.contentHeader, Styles.containerSearch)}
        >
          <Link href="/Home" className={Styles.buttonWrapper}>
            <button className={Styles.buttonHeader}>Inicio</button>
          </Link>
          <button className={Styles.buttonHeader} onClick={handleAboutClick}>
            Acerca de
          </button>
          <Link href="/ContactMe" className={Styles.buttonWrapper}>
            <button className={Styles.buttonHeader}>Contáctame</button>
          </Link>
        </div>

        <div
          className={classNames(Styles.contentHeader, Styles.containerProfile)}
        >
          <button className={Styles.btnProfile}>Sergio Guerra</button>
          {isAuthenticated && (
            <>
              <Image
                src="/img/menu.png"
                alt="Menú"
                width={30}
                height={30}
                className={Styles.profilePicture}
                onClick={toggleMenu}
                priority
              />
              {isMenuOpen && (
                <ModalMenu
                  onEditUser={() => {
                    handleOpenModal();
                    setMenuOpen(false);
                  }}
                  onChangePassword={handleOpenPasswordModal}
                  onLogout={handleLogout}
                />
              )}
            </>
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
