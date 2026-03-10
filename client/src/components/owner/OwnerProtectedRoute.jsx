import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const OwnerProtectedRoute = () => {
    const isOwnerAuthenticated = localStorage.getItem('ownerToken') === 'authenticated-owner-token';

    if (!isOwnerAuthenticated) {
        return <Navigate to="/owner/login" replace />;
    }

    return <Outlet />;
};

export default OwnerProtectedRoute;
