"use client"

import {
    CircleDollarSign,
    Heart,
    Languages,
    LogOut,
    Palette,
    ShoppingBag,
    User
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    return (
        <aside className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2 border-l-4 border-blue-500 pl-3">Hello Rima</h2>
            <p className="text-gray-600 mb-6">Welcome to your account</p>
            <nav className="flex flex-col gap-4">
                <Link href="/myAccount/" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <ShoppingBag />
                    <h6>My Orders</h6>
                </Link>
                <Link href="/myAccount/myWishlist" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <Heart />
                    <h6>Wishlist</h6>
                </Link>
                <Link href="/myAccount/changeCurrency" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <CircleDollarSign />
                    <h6>Currency</h6>
                </Link>
                <Link href="/myAccount/themes" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <Palette />
                    <h6>Themes</h6>
                </Link>
                <Link href="/myAccount/language" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <Languages />
                    <h6>Language</h6>
                </Link>
                <Link href="/myAccount/myInfo" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <User />
                    <h6>My Info</h6>
                </Link>
                <button className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <LogOut />
                    <h6>Sign Out</h6>
                </button>
            </nav>
        </aside>
    )
}
