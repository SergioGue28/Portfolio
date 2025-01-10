import React from "react";
import Styles from "../../styles/components/Header.module.css";
import classNames from 'classnames';
import Image from "next/image";
import Link from "next/link";
import FormPhoto from "./componentPhoto/FormPhoto";
import {useHeaderState} from "./Modal";

interface Props {
  photo: string,
}

const Header: React.FC <Props> = ({photo}) => {

  const {
    isModalOpen,
    profilePhoto,
    handleOpenModal,
    handleCloseModal,
    handleUpdatePhoto,
  } = useHeaderState({ photo });

  return (
    
    <header className={Styles.header}>

      <section className={Styles.containerHeader}>
        
        <div className={classNames( Styles.contentHeader, Styles.containerSocial)}>
        <a 
          href="https://www.instagram.com/sergiogue28/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div>
            <Image
              src="/img/instagram.png"
              alt="Instagram Icon"
              width={30}
              height={30}
              className={Styles.chat}
            />
          </div>
        </a>

        <a 
          href="https://www.facebook.com/sergio.guerra.9212?locale=es_LA"  
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div>
            <Image
              src="/img/facebook.png"
              alt="Instagram Icon"
              width={30}
              height={30}
              className={Styles.chat}
            />
          </div>
        </a>

        <a 
          href="https://www.linkedin.com/in/sergio-guerra-0041a8274/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div>
            <Image
              src="/img/linkedIn.png"
              alt="Instagram Icon"
              width={30}
              height={30}
              className={Styles.chat}
            />
          </div>
        </a>
        </div>

        <div className={classNames( Styles.contentHeader, Styles.containerSearch)}>
          <Link href="/Home" className={classNames(Styles.buttonHeader, Styles.about)}>
            <button className={classNames(Styles.buttonHeader, Styles.about)}>About</button>
          </Link>
          <Link href="/Home#about" className={classNames(Styles.buttonHeader, Styles.project)}>
            <button className={classNames(Styles.buttonHeader, Styles.project)}>Project</button>
          </Link>
          <Link href="/Home#about" className={classNames(Styles.buttonHeader, Styles.certificate)}>
            <button className={classNames(Styles.buttonHeader, Styles.certificate)}>Certificate</button>
          </Link >
        </div>

        <div className={classNames(Styles.contentHeader, Styles.containerProfile)}>
        
        <div className={Styles.tooltipContainer}>
          <button className={Styles.btnProfile} onClick={handleOpenModal}>Sergio Guerra</button>
          <div className={Styles.tooltip}>Editar nombre</div>
        </div>
      </div>

      </section>
         
    </header>
  );
};

export default Header;