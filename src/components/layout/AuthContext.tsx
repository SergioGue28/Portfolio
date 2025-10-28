import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// 🧩 Definición de la interfaz del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loginSuccess: () => void;
  logout: () => Promise<void>;
}

// 🧱 Crear el contexto tipado (puede ser null antes de inicializar)
const AuthContext = createContext<AuthContextType | null>(null);

// 🧩 Props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // ✅ Verificar sesión inicial
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // 🔑 Actualizar estado tras un login exitoso
  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  // 🚪 Cerrar sesión
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🎯 Hook personalizado para consumir el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
