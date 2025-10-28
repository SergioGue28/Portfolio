// src/pages/_app.tsx
import { AppProps } from "next/app";
import RootLayout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../components/layout/AuthContext";
import "../styles/global.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <RootLayout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </RootLayout>
    </AuthProvider>
  );
};

export default MyApp;
