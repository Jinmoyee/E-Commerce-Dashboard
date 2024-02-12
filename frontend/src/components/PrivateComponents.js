import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateComponents = () => {
    const auth = localStorage.getItem("user")
    return auth ? <Outlet /> : <Navigate to="/signUp" />
}

export default PrivateComponents