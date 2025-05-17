import React from "react";
import Styles from "../../styles/components/Nav.module.css";

const Nav: React.FC = () => {
  return (
    <nav className={Styles.nav}>
      <section className={Styles.containerNav}>
        <div className={Styles.nav}></div>
      </section>
    </nav>
  );
};

export default Nav;
