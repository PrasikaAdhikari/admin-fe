import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import Sidebar from "./components/layout/SideBar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<Navigate to="/sidebar" />} /> */}
      </Routes>
    </>
  );
};

export default App;
