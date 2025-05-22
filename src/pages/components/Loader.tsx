// components/Loader.tsx
import React from "react";
import Styles from "../../styles/components/Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={Styles.loader} data-show-shadow>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.528 35.424">
        <path
          fill="#000"
          d="M3.358 35.05c.435-.175.646-.408.861-.95..."
        />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2.4 14.4">
        <path
          fill="#000"
          d="M2.2 13c0 .641-.447 1.16-1 1.16..."
        />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.528 35.424">
        <path
          fill="#000"
          d="M15.105 35.155c-.42-.196-.627-.482..."
        />
      </svg>
    </div>
  );
};

export default Loader;

