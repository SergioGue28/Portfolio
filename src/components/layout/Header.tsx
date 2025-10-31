import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Styles from "../../styles/components/Header.module.css";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import UpdateInformation from "../Forms/UpdateInformation";
import ChangePassword from "../Forms/ChangePassword";
import ModalMenu from "../Modals/ModalMenu"; // Usaremos este componente para el menú "Admin"
import { scroller } from "react-scroll";
import GitHubButton from "../componentsLogo/GitHubButton";
import LinkedInButton from "../componentsLogo/LinkedInButton";
import GmailButton from "../componentsLogo/GmailButton";
import WhatsAppButton from "../componentsLogo/WhatsAppButton";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  // Renombramos y reutilizamos este estado para controlar el menú de Admin/tablet
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  
  // Estado para controlar el menú modal global en tamaños pequeños
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  // Detectar el tamaño de la pantalla para el menú móvil/tablet
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      // Coincide con el media query de 800px en el CSS
      setIsMobileOrTablet(window.innerWidth < 800); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  // Detectar scroll (sin cambios)
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

  // Verificar sesión (sin cambios)
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
  const handleOpenModal = () => {
    setModalOpen(true);
    setIsAdminMenuOpen(false); // Cierra el menú de Admin al abrir el modal de edición
  }

  const handleOpenPasswordModal = () => {
    setPasswordModalOpen(true);
    setIsAdminMenuOpen(false); // Cierra el menú de Admin al abrir el modal de contraseña
  };
  const handleClosePasswordModal = () => setPasswordModalOpen(false);

  // Funciones para el Menú Admin
  const toggleAdminMenu = () => setIsAdminMenuOpen(!isAdminMenuOpen);
  
  // Funciones para el Menú Móvil/Tablet
  const openFullMenu = () => setIsFullMenuOpen(true);
  const closeFullMenu = () => {
    // Solo cierra si no está navegando
    setIsFullMenuOpen(false); 
  };


  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsAuthenticated(false);
      setIsAdminMenuOpen(false); // Cierra el menú de Admin
      closeFullMenu(); // Cierra el menú completo si está abierto
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleAboutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    closeFullMenu(); // Cierra el menú al navegar
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
        {/* Contenido Social (sin cambios) */}
        <div
          className={classNames(Styles.contentHeader, Styles.containerSocial)}
        >
          <GmailButton />
          <LinkedInButton />
          <GitHubButton />
          <WhatsAppButton />
        </div>

        {/* Contenedor de Navegación principal */}
        {/* En desktop: Inicio, Acerca de, Contáctame. En móvil/tablet: oculto */}
        <div
          className={classNames(Styles.contentHeader, Styles.containerSearch)}
        >
          <Link href="/Home" className={Styles.buttonWrapper}>
            <button className={Styles.buttonHeader} onClick={closeFullMenu}>Inicio</button>
          </Link>
          <button className={Styles.buttonHeader} onClick={handleAboutClick}>
            Acerca de
          </button>
          <Link href="/ContactMe" className={Styles.buttonWrapper}>
            <button className={Styles.buttonHeader} onClick={closeFullMenu}>Contáctame</button>
          </Link>
          
          {/* Botón Admin - visible en todos los tamaños cuando autenticado */}
          {isAuthenticated && (
            <>
                <button 
                    className={classNames(Styles.buttonHeader, Styles.adminButton)} 
                    onClick={toggleAdminMenu}
                >
                    Admin
                </button>
                {isAdminMenuOpen && (
                    <ModalMenu
                        onEditUser={handleOpenModal}
                        onChangePassword={handleOpenPasswordModal}
                        onLogout={handleLogout}
                    />
                )}
            </>
          )}

        </div>

        {/* Perfil y Menú Hamburguesa */}
        <div
          className={classNames(Styles.contentHeader, Styles.containerProfile)}
        >
          <button className={Styles.btnProfile}>Sergio Guerra</button>
          
          {/* Icono de menú (hamburguesa) - solo visible en móvil/tablet */}
          {isMobileOrTablet && (
             <Image
                src="/img/menu.png"
                alt="Menú"
                width={30}
                height={30}
                className={Styles.profilePicture}
                onClick={openFullMenu} // Abre el modal de menú completo
                priority
             />
          )}

        </div>
      </section>
      
      {/* Modal de Menú Completo para Móvil/Tablet */}
      {isFullMenuOpen && (
        <div className={Styles.fullScreenModal} onClick={closeFullMenu}>
            <div className={Styles.modalContent} onClick={e => e.stopPropagation()}>
                {/* Botón de Cierre (X) */}
                <button className={Styles.closeButton} onClick={closeFullMenu}>X</button>
                
                {/* Contenido del Header para que se vea la info */}
                <div className={Styles.modalHeaderContent}>
                    <Link href="/Home" className={Styles.modalButtonWrapper}>
                        <button className={Styles.modalButton} onClick={closeFullMenu}>Inicio</button>
                    </Link>
                    <button className={Styles.modalButton} onClick={handleAboutClick}>
                        Acerca de
                    </button>
                    <Link href="/ContactMe" className={Styles.modalButtonWrapper}>
                        <button className={Styles.modalButton} onClick={closeFullMenu}>Contáctame</button>
                    </Link>
                    
                    {/* Botones de Admin si está autenticado */}
                    {isAuthenticated && (
                        <>
                            <button className={Styles.modalButton} onClick={handleOpenModal}>Editar Usuario</button>
                            <button className={Styles.modalButton} onClick={handleOpenPasswordModal}>Cambiar Contraseña</button>
                            <button className={Styles.modalButton} onClick={handleLogout}>Cerrar Sesión</button>
                        </>
                    )}
                </div>

                {/* Podrías añadir los botones sociales aquí también si quieres */}
                <div className={Styles.modalSocialContent}>
                    <GmailButton />
                    <LinkedInButton />
                    <GitHubButton />
                    <WhatsAppButton />
                </div>
            </div>
        </div>
      )}

      {/* Modals de Formulario (sin cambios) */}
      <UpdateInformation isOpen={isModalOpen} onClose={handleCloseModal} />
      <ChangePassword
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
      />
    </header>
  );
};

export default Header;