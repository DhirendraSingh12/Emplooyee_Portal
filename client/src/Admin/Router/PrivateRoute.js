import React from 'react';
import { Navigate } from 'react-router-dom';
export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        // If no token, navigate to the login page
        return <Navigate to="/login" />;
    }
    return children;
};
