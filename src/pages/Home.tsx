import React from 'react';
import Link from 'next/link';
import Styles from '../styles/Home.module.css';
import Image from "next/image";
import classNames from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import FormPhoto from "../pages/components/componentPhoto/FormPhoto";

interface Props {
  photo?: string; // Hacerlo opcional si no siempre se proporciona
}

const Home: React.FC <Props> = ({photo}) => {

  const [profilePhoto, setProfilePhoto] = useState(photo || "/img/FOTO.jpg");
  
  useEffect(() => {
    if (photo) {
      setProfilePhoto(photo);
    }
  }, [photo]);

  const handleUpdatePhoto = (formData: { photo: string }) => {
    setProfilePhoto(formData.photo); // Actualiza la foto de perfil
  };
    return (
      <nav className={Styles.nav}>

        <section className={classNames(Styles.home, Styles.fadeIn)}>

            <div className={classNames(Styles.photo, Styles.fadeIn)}>
            <Image
              src={profilePhoto}
              alt="Foto de perfil"
              width={600}
              height={600}
              className={classNames(Styles.profilePicture, Styles.fadeIn)}
            /> 
            </div>
            
            <div className={classNames(Styles.text, Styles.fadeIn)}>
              <span className={Styles.textMayus}>Hi, this's<span className={Styles.textColor}> Sergio Andres Guerra Corrales</span> </span>
              <br/>
              <span className={Styles.contex}>
              programmer with 9 months of experience in 
              the field of Backend development, in the 
              creation and administration of REST APIs, 
              facilitating system integration and 
              communication between different platforms 
              in a scalable and efficient way. 
              programmer with 9 months of experience in 
              the field of Backend development, in the 
              creation and administration of REST APIs, 
              facilitating system integration and 
              communication between different platforms,
              programmer with 9 months of experience in 
              the field of Backend development, in the 
              creation and administration of REST APIs, 
              facilitating system integration and 
              communication between different platforms 
              in a scalable and efficient way. 
              programmer with 9 months of experience in 
              the field of Backend development, in the 
              creation and administration of REST APIs, 
              facilitating system integration and 
              communication between different platforms 
              </span>
            </div>  

        </section>

        <div id="about" className={classNames(Styles.tittleCard, Styles.fadeIn)}>
          <div className={Styles.textTitle}>ABOUT</div>
        </div>
        
        <section className={classNames(Styles.containerCard, Styles.fadeIn)}>
          
            <Link href="/Project" className={classNames(Styles.card, Styles.cardProject, Styles.fadeIn)}>
              <Image
                src="/img/nubelson-fernandes-UcYBL5V0xWQ-unsplash.jpg"
                alt="Settings Icon"
                width={600}
                height={600}
                className={classNames( Styles.imgcard, Styles.imgcardProject)}
              />
              <div className={Styles.textOverlay}>
                <h3 className={Styles.title}>All Projects</h3>
              </div>
            
          </Link>

          <Link href="/Certificate" className={classNames(Styles.card, Styles.cardCertificate, Styles.fadeIn)}>
            <Image
              src="/img/liam-truong-htpU_wGEcW0-unsplash.JPG"
              alt="Certificates"
              width={600}
              height={600}
              className={classNames( Styles.imgcard, Styles.imgcardCertificate)}
            />
              <div className={Styles.textOverlay}>
                <h3 className={Styles.title}>Certificates</h3>
              </div>
          </Link>        
          <FormPhoto
            onAddUser={handleUpdatePhoto}
            isOpen={false}
            onClose={() => console.log('Form closed')}
            />

        </section>

      </nav>
    );
  };
  
  export default Home;
