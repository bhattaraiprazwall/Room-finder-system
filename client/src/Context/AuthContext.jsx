import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Loading the user from storage when app starts
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token:", error);
                sessionStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token) => {
        try {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
            sessionStorage.setItem('token', token);
            console.log("Logged in user:", decodedUser);
        } catch (error) {
            console.error("Invalid token during login:", error);
            throw new Error("Invalid token");
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('token'); // Changed to sessionStorage
        console.log("User logged out");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};