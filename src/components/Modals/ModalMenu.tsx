// src/components/Modals/ModalMenu.tsx
import React from "react";
import styles from "../../styles/components/Modals/ModalMenu.module.css";
import { FaUserEdit, FaLock, FaSignOutAlt } from "react-icons/fa";

interface ModalMenuProps {
  onEditUser: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

const ModalMenu: React.FC<ModalMenuProps> = ({
  onEditUser,
  onChangePassword,
  onLogout,
}) => {
  return (
    <div className={styles.modalMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={onEditUser}>
          <FaUserEdit className={styles.icon} />
          Edit User
        </li>
        <li className={styles.menuItem} onClick={onChangePassword}>
          <FaLock className={styles.icon} />
          Change Password
        </li>
        <li className={styles.menuItem} onClick={onLogout}>
          <FaSignOutAlt className={styles.icon} />
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default ModalMenu;
