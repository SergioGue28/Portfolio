import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      console.log("🔹 Enviando login con:", { email, password });

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔒 permite recibir la cookie HttpOnly
      });

      let data: any;
      try {
        data = await res.json();
      } catch {
        setMessage("Error al procesar la respuesta del servidor ❌");
        setLoading(false);
        return;
      }

      if (res.ok) {
        console.log("✅ Inicio de sesión exitoso:", data);
        setMessage("Inicio de sesión exitoso ✅");

        // Espera un momento antes de redirigir
        setTimeout(() => {
          router.push("/Home"); // Redirige al home o dashboard
        }, 1200);
      } else {
        console.warn("⚠️ Error en login:", data.message);
        setMessage(data.message || "Error al iniciar sesión ❌");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      setMessage("Error de conexión con el servidor ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        {message && <p className={styles.message}>{message}</p>}

      </form>
    </div>
  );
};

export default Login;
