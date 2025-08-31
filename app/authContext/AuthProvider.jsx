"use client"
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [sessionUser, setSessionUser] = useState(null)

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/session`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken") || ""}`,
                        "x-vendor-identifier": "cmev38g4z000064vhktlpkq9z",
                    },
                })
                const data = await res.json()
                if (data.success) {
                    setSessionUser(data.user)
                } else {
                    setSessionUser(null)
                }
                console.log("Session Response:", data)
            } catch (err) {
                console.error("Session fetch error:", err)
            }
        }
        fetchSession()
    }, [])

    const contextData = {
        sessionUser,
        setSessionUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;