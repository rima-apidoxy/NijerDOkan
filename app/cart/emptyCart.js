"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-gray-50 px-4">
            <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
                Looks like you haven’t added anything to your cart yet.
            </p>
            <Link href="/products">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    Shop Now
                </Button>
            </Link>
        </div>
    )
}
