// components/SiteContext.js
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const SiteContext = createContext({
    title: "",
    navbar: []
})

export function SiteProvider({ children }) {
    const [config, setConfig] = useState({
        title: "",
        navbar: []
    })

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/site-config")
                const data = await res.json()
                setConfig(data)
            } catch (e) {
                console.error("Failed loading site config:", e)
            }
        }
        load()
    }, [])

    return (
        <SiteContext.Provider value={config}>
            {children}
        </SiteContext.Provider>
    )
}

export function useSite() {
    return useContext(SiteContext)
}
