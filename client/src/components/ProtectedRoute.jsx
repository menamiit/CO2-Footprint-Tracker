import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

const ProtectedRoute = ({ children })=> {
    const isAuth = isAuthenticated();
    console.log("Authenticated: ", isAuth);
    if(!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;