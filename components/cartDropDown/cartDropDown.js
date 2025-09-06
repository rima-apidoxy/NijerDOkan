"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CartDropdown() {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCart = async () => {
            const accessToken = localStorage.getItem("accessToken")
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || "Failed to fetch cart")
                setCart(data.data || null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [])

    const items = cart?.items || []
    const total = cart?.totals?.grandTotal || 0
    return (
        <div className="relative group">
            {/* Cart Icon */}
            <div className="cursor-pointer relative">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                        {items.length}
                    </span>
                )}
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition z-50">
                <div className="p-4 space-y-4">
                    <h4 className="font-bold text-lg text-gray-800">Your Cart</h4>

                    {loading ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500">{error}</p>
                    ) : items.length === 0 ? (
                        <p className="text-sm text-gray-500">Cart is empty</p>
                    ) : (
                        <>
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3 border-b pb-3 items-center"
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${cart.shop}/${item.image}`}
                                        alt={item.productTitle || "Product Image"}
                                        width={56}
                                        height={56}
                                        className="w-14 h-14 object-cover rounded"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 text-sm">
                                            {item.productTitle}
                                        </p>
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>
                                                ৳{item?.price} × {item.quantity}
                                            </span>
                                            <span className="font-semibold text-gray-800">
                                                ৳{(item.subtotal).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2 border-t text-sm font-semibold flex justify-between text-gray-700">
                                <span>Total:</span>
                                <span>৳{total.toFixed(2)}</span>
                            </div>

                            <Link
                                href="/myCart"
                                className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white inline-block text-center py-2 rounded"
                            >
                                View Cart
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
