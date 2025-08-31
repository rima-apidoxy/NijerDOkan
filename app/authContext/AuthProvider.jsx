"use client"
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [login, setLogin] = useState(null)
    const contextData = {
        login,
        setLogin
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;