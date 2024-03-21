import { useAuth } from "@/contexts/auth-context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, logOut } = useAuth();
  if (user && user.role === "admin") return children;
  logOut();
  return <Navigate to="/login" replace={true} />;
};

export default ProtectAdminRoute;
