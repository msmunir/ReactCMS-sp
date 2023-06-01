import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./RootLayout.scss";

const RootLayout = () => {
  return (
    <>
      <div className="site-wrap">
        <Navbar />
        <div className="outlet">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
