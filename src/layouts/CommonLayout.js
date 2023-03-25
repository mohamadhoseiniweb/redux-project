import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from 'react-router-dom'

const CommonLayout = () => {
  return (
    <div className="container mx-auto max-w-6xl">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default CommonLayout;