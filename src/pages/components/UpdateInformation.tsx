import React, { useState } from "react";
import Styles from "../../styles/components/UpdateInformation.module.css";
import classNames from "classnames";

interface UpdateInformationProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateInformation: React.FC<UpdateInformationProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      description,
      profilePicture,
    });
    onClose(); // Close the modal after submitting
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  if (!isOpen) return null; // Does not render if the modal is closed

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button className={Styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={Styles.title}>Update Your Information</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.column}>
            {/* Columna 1 */}
            <div className={Styles.formGroup}>
              <label htmlFor="profilePicture" className={Styles.label}>
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleFileChange}
                className={Styles.fileInput}
              />
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="name" className={Styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={Styles.input}
                required
              />
            </div>
            
          </div>

          {/* Columna 2 */}
          <div className={Styles.column}>
            <div className={Styles.formGroup}>
              <label htmlFor="description" className={Styles.label}>
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write about yourself..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={Styles.textarea}
                maxLength={400}
              ></textarea>
              <small className={Styles.charCount}>{description.length + "/400"}</small>
            </div>
          </div>

          <div className={Styles.formGroupButton}>
            <button type="submit" className={Styles.button}>
              Update Information
            </button>
            <button type="button" className={classNames(Styles.button, Styles.cancelButton)} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInformation;
