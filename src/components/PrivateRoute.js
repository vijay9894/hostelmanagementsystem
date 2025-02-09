import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const storedPrn = sessionStorage.getItem("prn");

    return storedPrn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
