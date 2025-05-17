import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        toast.error(`❌ ${message}`, { position: "top-center" });
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Guardamos token para uso posterior
      toast.success("Successful login", { position: "top-center" });

      setTimeout(() => {
        router.push("/Home"); // Redirigimos al Home tras login
      }, 1500);
    } catch (err: any) {
      toast.error(`❌ Login error: ${err.message}`, {
        position: "top-center",
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            className={styles.inputField}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Log in
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
