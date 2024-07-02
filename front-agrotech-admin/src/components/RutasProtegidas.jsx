import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const RutasProtegidas = ({ isAllowed, redirectPath = "/", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
