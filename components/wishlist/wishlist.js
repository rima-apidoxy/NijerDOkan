"use client"

import Image from "next/image"
import { X } from "lucide-react"

const wishlistItems = [
    {
        id: 1,
        name: "Blue Flower Print Crop Top",
        color: "Yellow",
        quantity: 1,
        price: 29.0,
        image: "/images/wishlist-1.jpg",
    },
    {
        id: 2,
        name: "Yellow Flower Print Dress",
        color: "Yellow",
        quantity: 1,
        price: 78.0,
        image: "/images/wishlist-2.jpg",
    },
    {
        id: 3,
        name: "White Hoodie long sleeve",
        color: "White",
        quantity: 1,
        price: 134.0,
        image: "/images/wishlist-3.jpg",
    },
    {
        id: 4,
        name: "Brown men’s long sleeve T-shirt",
        color: "Brown",
        quantity: 1,
        price: 93.0,
        image: "/images/wishlist-4.jpg",
    },
]

export default function Wishlist() {
    return (
        <div className="w-11/12 max-w-4xl mx-auto py-10">
            <h2 className="text-lg font-semibold mb-6">Wishlist</h2>

            <div className="space-y-4">
                {wishlistItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-4"
                    >
                        
                        <div className="flex items-center gap-4">
                            <button className="text-gray-400 hover:text-red-600">
                                <X className="w-5 h-5" />
                            </button>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="rounded object-cover w-14 h-14"
                            />
                            <div>
                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Color :</span> {item.color}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Quantity :</span> {item.quantity}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <p className="font-medium text-gray-800 whitespace-nowrap">
                                ৳{item.price.toFixed(2)}
                            </p>
                            <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 transition">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
