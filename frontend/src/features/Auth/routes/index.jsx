import * as React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

export const AuthRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </AnimatePresence>
  );
};
