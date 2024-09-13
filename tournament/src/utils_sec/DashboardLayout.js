import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbars from "../components/Navbar";
const DashboardLayout = () => {
  const tokensss = localStorage.getItem('accessToken')

  return tokensss ? (
    <>
    <Navbars />
  <Outlet />
    </>
  ) : (
   <>
    <Navigate to="/login" />
  </>
  );
};

export default memo(DashboardLayout);