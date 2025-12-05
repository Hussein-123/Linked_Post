import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
