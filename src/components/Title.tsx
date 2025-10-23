import React from "react";
import Styles from "../styles/components/Tittle.module.css";

interface TittleProps {
  text: string;
}
const Tittle: React.FC<TittleProps> = ({ text }) => {
  return (
    <nav className={Styles.tittle}>
      <div className={Styles.text}>{text}</div>
    </nav>
  );
};

export default Tittle;
