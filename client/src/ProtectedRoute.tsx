import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = (): JSX.Element => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <h1>Loading...</h1>;

    if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

    return <Outlet />;
};

export default ProtectedRoute;
