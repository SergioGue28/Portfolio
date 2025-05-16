// src/pages/_app.tsx
import { AppProps } from 'next/app';
import RootLayout from './Layout'; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </RootLayout>
  );
};

export default MyApp;
