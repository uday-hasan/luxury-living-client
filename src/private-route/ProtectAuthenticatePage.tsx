import { useAuth } from "@/contexts/auth-context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectAuthenticatePage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  if (!user) return children;

  return <Navigate to="/" replace />;
};

export default ProtectAuthenticatePage;
