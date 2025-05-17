import React from "react";
import { montserrat } from "../ui/fonts";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className={`${montserrat.className} antialiased`}>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
