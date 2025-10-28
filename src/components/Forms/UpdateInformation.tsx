import React, { useState, useEffect } from "react";
import Styles from "../../styles/components/Forms/UpdateInformation.module.css";
import classNames from "classnames";
import { toast } from "react-toastify";

interface UpdateInformationProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateInformation: React.FC<UpdateInformationProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos actuales del portfolio al abrir el modal
  useEffect(() => {
    if (isOpen) {
      const fetchPortfolio = async () => {
        try {
          const res = await fetch("/api/portfolio/portfolio");
          if (!res.ok) throw new Error("Failed to fetch portfolio data");
          const data = await res.json();
          setName(data.fullName || "");
          setPosition(data.position || "");
          setDescription(data.description || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
        } catch (err) {
          toast.error("Error fetching portfolio data", { autoClose: 5000 });
        }
      };
      fetchPortfolio();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("position", position);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("phone", phone);
    if (profilePicture) formData.append("photo", profilePicture);

    try {
      const response = await fetch("/api/portfolio/updatePortfolio", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update portfolio.");
      }

      toast.success("Information updated successfully!", { autoClose: 3000 });
      onClose();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modal}>
        <button
          className={Styles.closeButton}
          onClick={onClose}
          disabled={loading}
        >
          &times;
        </button>
        <h2 className={Styles.title}>Update Your Information</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.column}>
            <div className={Styles.formGroup}>
              <label htmlFor="profilePicture" className={Styles.label}>
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleFileChange}
                className={Styles.fileInput}
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="position" className={Styles.label}>
                Position
              </label>
              <input
                type="text"
                id="position"
                placeholder="Enter your position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={Styles.input}
                disabled={loading}
              />
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="email" className={Styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={Styles.input}
                disabled={loading}
              />
            </div>

            <div className={Styles.formGroup}>
              <label htmlFor="phone" className={Styles.label}>
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={Styles.input}
                disabled={loading}
              />
            </div>
          </div>

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
                maxLength={1000}
                disabled={loading}
              ></textarea>
              <small className={Styles.charCount}>
                {description.length}/1000
              </small>
            </div>
          </div>

          <div className={Styles.formGroupButton}>
            <button type="submit" className={Styles.button} disabled={loading}>
              {loading ? "Updating..." : "Update Information"}
            </button>
            <button
              type="button"
              className={classNames(Styles.button, Styles.cancelButton)}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInformation;
