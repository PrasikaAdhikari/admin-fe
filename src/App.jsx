import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import AdminDashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
