import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { ToastContainer } from "react-toastify";
const DashboardLayout = () => {
  const tokensss = localStorage.getItem('accessToken')
  return tokensss ? (
    <>
    {/* <ToastContainer/> */}
    <Navbar />
  <Outlet />
    </>
  ) : (
   <>
    <Navigate to="/login" />
  </>
  );
};

export default memo(DashboardLayout);