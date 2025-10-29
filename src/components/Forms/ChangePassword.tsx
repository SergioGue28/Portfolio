import React, { useState } from "react";
import styles from "../../styles/components/Forms/ChangePassword.module.css";
import { toast } from "react-toastify";

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          passwordConfirmation,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        toast.success(result);
        onClose();
      } else {
        toast.error(result);
      }
    } catch (error) {
      toast.error("Error connecting to the server.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <div className={styles.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
