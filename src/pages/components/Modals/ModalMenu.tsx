// src/components/ModalMenu.tsx
import React from "react";
import styles from "../../../styles/components/Modals/ModalMenu.module.css";
import { FaUserEdit, FaLock } from "react-icons/fa";

interface ModalMenuProps {
  onEditUser: () => void;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ onEditUser }) => {
  return (
    <div className={styles.modalMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={onEditUser}>
          <FaUserEdit className={styles.icon} />
          Editar Usuario
        </li>
        <li className={styles.menuItem}>
          <FaLock className={styles.icon} />
          Cambiar Contraseña
        </li>
      </ul>
    </div>
  );
};

export default ModalMenu;
