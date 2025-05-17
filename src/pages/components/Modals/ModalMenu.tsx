import React from "react";
import styles from "../../../styles/components/Modals/ModalMenu.module.css";
import { FaUserEdit, FaLock } from "react-icons/fa";

interface ModalMenuProps {
  onEditUser: () => void;
  onChangePassword: () => void;
}

const ModalMenu: React.FC<ModalMenuProps> = ({
  onEditUser,
  onChangePassword,
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
      </ul>
    </div>
  );
};

export default ModalMenu;
