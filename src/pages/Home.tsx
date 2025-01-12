import Link from 'next/link';
import Styles from '../styles/Home.module.css';
import Image from "next/image";
import classNames from 'classnames';
import FormPhoto from "../pages/components/componentPhoto/FormPhoto";
import { useHeaderState } from "../pages/components/Modal";
import FormDescription from './components/componentPhoto/FormDescription';

interface Props {
  photo: string;
}

const Home: React.FC<Props> = ({ photo }) => {
  const {
    isModalOpen,
    profilePhoto,
    handleOpenModal,
    handleCloseModal,
    handleUpdatePhoto,
    handleCloseDescriptionModal,
    handleOpenDescriptionModal,
    isDescriptionModalOpen,
    handleUpdateDescription,
    description
  } = useHeaderState({ photo });


  

  return (
    <nav className={Styles.nav}>
      <section className={classNames(Styles.home, Styles.fadeIn)}>
        <div className={classNames(Styles.photo, Styles.fadeIn)}>
          <Image
            src={profilePhoto}
            alt="Foto de perfil"
            width={450}
            height={450}
            className={classNames(Styles.profilePicture, Styles.fadeIn)}
            onClick={handleOpenModal}
          />
        </div>

        <div className={classNames(Styles.text, Styles.fadeIn)}>
          
          <span
            className={Styles.contex}
            onClick={handleOpenDescriptionModal} 
          >
            {description}
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
            width={450}
            height={450}
            className={classNames(Styles.imgcard, Styles.imgcardProject)}
          />
          <div className={Styles.textOverlay}>
            <h3 className={Styles.title}>All Projects</h3>
          </div>
        </Link>

        <Link href="/Certificate" className={classNames(Styles.card, Styles.cardCertificate, Styles.fadeIn)}>
          <Image
            src="/img/liam-truong-htpU_wGEcW0-unsplash.JPG"
            alt="Certificates"
            width={450}
            height={450}
            className={classNames(Styles.imgcard, Styles.imgcardCertificate)}
          />
          <div className={Styles.textOverlay}>
            <h3 className={Styles.title}>Certificates</h3>
          </div>
        </Link>
      </section>

      <FormPhoto
        onAddUser={handleUpdatePhoto}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <FormDescription
        isOpen={isDescriptionModalOpen}
        onClose={handleCloseDescriptionModal}
        onAddDescription={handleUpdateDescription}
      />
    </nav>
  );
};

export default Home;
