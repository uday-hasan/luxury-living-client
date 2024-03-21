import { useAuth } from "@/contexts/auth-context/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedUserRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, Loading } = useAuth();
  const location = useLocation();
  if (Loading) return <h1 className="text-4xl font-bold ">Loading</h1>;
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
  }
  return children;
};

export default ProtectedUserRoute;
