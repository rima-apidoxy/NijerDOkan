"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0)
    const [cartItems, setCartItems] = useState({
        _id: null,
        shop: null,
        totals: { subtotal: 0, discount: 0, tax: 0, deliveryCharge: 0, grandTotal: 0 },
        cartId: null,
        itemCount: 0,
        items: [],
    });

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("accessToken")
            if (!token) return
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
                    headers: { "Authorization": `Bearer ${token}` },
                })
                const data = await res.json()
                if (res.ok && data?.data) {
                    setCartItems(data.data || {})
                    setCartCount(data.data.items?.length || 0)
                }
            } catch (err) {
                console.error("Failed to fetch cart:", err)
            }
        }

        fetchCart()
    }, [])


    console.log("cartItems******************8")
    console.log(cartItems)
    return (
        <CartContext.Provider value={{ cartCount, setCartCount, cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
