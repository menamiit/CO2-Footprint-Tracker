import React from "react";
import { useState, createContext, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children })=> {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const logout = useCallback(()=> {
        console.log("Session expired or user logged out. Clearing token.");

        setToken(null);
        localStorage.removeItem('token');
        navigate('/login?sessionExpired=true'); 
    }, [navigate]);

    const value = {
        token,
        logout,
    };

    return <AuthContext.Provider value={value} > {children}</AuthContext.Provider>
}


export const useAuth = ()=> {
    return useContext(AuthContext);
}
