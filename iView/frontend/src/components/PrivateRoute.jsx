import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  // Token yoksa veya süresi dolmuşsa, login sayfasına yönlendir
  if (!token || !tokenExpiry || new Date().getTime() > parseInt(tokenExpiry)) {
    localStorage.removeItem("token"); // Geçersiz token'ı kaldır
    localStorage.removeItem("tokenExpiry");
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
