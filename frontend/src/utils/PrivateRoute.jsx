import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuthorized }) => {
    return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
