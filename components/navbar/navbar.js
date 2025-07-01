"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    Menu,
    Search,
    User,
    Heart,
    ChevronDown,
    TableOfContents,
} from "lucide-react"
import { Input } from "../ui/input"
import CartDropdown from "../cartDropDown/cartDropDown"

export function Navbar() {
    const [openCategories, setOpenCategories] = useState(false)
    const [openSubcategory, setOpenSubcategory] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleSubcategory = (label) => {
        setOpenSubcategory(openSubcategory === label ? null : label)
    }

    const navLinks = [
        { label: "HOME", href: "/" },
        { label: "SHOP", href: "/shop" },
        { label: "My ACCOUNT", href: "/myAccount" },
        { label: "CATEGORIES", href: "/categories" },
        { label: "FAQ", href: "/faq" },
        { label: "CONTACT US", href: "/contact" },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4">
                {/* Logo */}
                <h2 className="text-blue-600 font-extrabold text-2xl">NijerDokan</h2>

                {/* Search */}
                <div className="relative flex-grow w-full md:max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    <Input
                        type="search"
                        placeholder="Search essentials, Groceries and more..."
                        className="bg-blue-50 border-0 rounded-full pl-10 pr-10 py-2 focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    <TableOfContents
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 rotate-180 cursor-pointer"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6 text-gray-700">
                    <Link href="/auth" className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <User className="text-blue-600" />
                        <span className="text-sm md:font-semibold">Sign Up/Sign In</span>
                    </Link>

                    <Link href="/myWishlist" className="flex items-center cursor-pointer hover:text-blue-600">
                        <Heart className="text-blue-600" />
                        <span className="text-sm md:font-semibold ml-1">Wishlist</span>
                    </Link>

                    <Link href="/myCart" className="flex items-center cursor-pointer hover:text-blue-600">
                        <CartDropdown />
                        <span className="text-sm md:font-semibold ml-1">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Bottom nav */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mb-8">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-11/12 max-w-7xl mx-auto py-2 gap-2">
                    <div className="flex justify-between items-center gap-2">
                        {/* Categories */}
                        <div className="relative">
                            <button
                                onClick={() => setOpenCategories(!openCategories)}
                                className="flex items-center gap-2 font-semibold px-4 py-2 hover:bg-blue-700 rounded-md bg-blue-800"
                            >
                                <Menu className="w-5 h-5" />
                                Categories
                            </button>

                            {openCategories && (
                                <div className="absolute left-0 mt-2 w-64 bg-white text-gray-800 shadow rounded z-50">
                                    <ul>
                                        {menuData.map((category) => {
                                            const hasChildren = category.children?.length > 0
                                            const isOpen = openSubcategory === category.label

                                            return (
                                                <li key={category.label} className="border-b last:border-0">
                                                    <button
                                                        className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                                                        onClick={() =>
                                                            hasChildren && toggleSubcategory(category.label)
                                                        }
                                                    >
                                                        <span>{category.label}</span>
                                                        {hasChildren && (
                                                            <ChevronDown
                                                                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        )}
                                                    </button>
                                                    {hasChildren && isOpen && (
                                                        <ul className="bg-gray-50">
                                                            {category.children.map((subcat) => (
                                                                <li
                                                                    key={subcat.label}
                                                                    className="px-8 py-2 hover:bg-blue-100 cursor-pointer"
                                                                >
                                                                    {subcat.label}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Menu toggle (for small screens) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded hover:bg-blue-700"
                        >
                            <TableOfContents className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav options */}
                    <nav
                        className={`flex flex-wrap gap-2 md:gap-3 font-medium text-sm md:text-base ${menuOpen ? "flex" : "hidden"
                            } md:flex`}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="px-3 py-1 rounded-md hover:bg-blue-800 transition"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

const menuData = [
    {
        label: "Clothing",
        children: [{ label: "Men's Wear" }, { label: "Women's Wear" }],
    },
    {
        label: "Foods and beverage",
        children: [{ label: "Snacks" }, { label: "Drinks" }],
    },
    {
        label: "Plastics",
        children: [{ label: "Home Use" }, { label: "Industrial Use" }],
    },
    {
        label: "Fabrics",
        children: [{ label: "Raw Fabrics" }, { label: "Finished Fabrics" }],
    },
    {
        label: "Chemicals",
        children: [{ label: "Household Chemicals" }, { label: "Industrial Chemicals" }],
    },
]
