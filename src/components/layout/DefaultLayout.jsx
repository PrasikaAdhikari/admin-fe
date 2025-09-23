import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="d-flex flex-column " style={{ height: "100vh" }}>
      {/* Navbar */}
      <Header />
      {/* page content */}
      <main className="main flex-grow-1">
        <Outlet />
      </main>
      {/* Footer content */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
