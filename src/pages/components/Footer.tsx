import React from 'react';
import Styles from '../../styles/components/Footer.module.css'
import classNames from 'classnames';

const Footer: React.FC = () => {
    return (
      <footer className={Styles.footer}>

        <section className={Styles.containerFooter}>
      
						<div className={Styles.nameFooter}>sergio Guerra</div>

						<section className={Styles.containerElement}>
							<div className={classNames( Styles.buttonFooter, Styles.home)}>Home</div>
							<div className={classNames( Styles.buttonFooter, Styles.about)}>About</div>
							<div className={classNames( Styles.buttonFooter, Styles.service)}>Service</div>
							<div className={classNames( Styles.buttonFooter, Styles.contactUs)}>Contact Us</div>
						</section>

						<section className={Styles.ContainerSocial}>
							<div className={Styles.social}>IG</div>
							<div className={Styles.social}>FB</div>
							<div className={Styles.social}>LD</div>
						</section>
						<section className={Styles.Containerline}>
						<hr className={Styles.line} />
						</section >

						<div className={Styles.logo}>
							No se que poner aca
						</div>
						
						
         
        </section>

      </footer>
    );
  };
  
  export default Footer;
  