"use client"

import { Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EmptyWishlistPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-gray-50 px-4">
            <Heart className="w-16 h-16 text-pink-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
                Start adding products you love to your wishlist.
            </p>
            <Link href="/products">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Browse Products
                </Button>
            </Link>
        </div>
    )
}
