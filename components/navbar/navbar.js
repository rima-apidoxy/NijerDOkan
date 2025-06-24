"use client"

import * as React from "react"
import Link from "next/link"
import {
    Menu,
    Search,
    ShoppingCart,
    TableOfContents,
    User,
    ChevronDown,
} from "lucide-react"

import { Input } from "../ui/input"

export function Navbar() {
    const [openSubIndex, setOpenSubIndex] = React.useState(null)
    const [openSubSubIndex, setOpenSubSubIndex] = React.useState(null)

    const toggleSubMenu = (index) => {
        if (openSubIndex === index) {
            setOpenSubIndex(null)
            setOpenSubSubIndex(null)
        } else {
            setOpenSubIndex(index)
            setOpenSubSubIndex(null)
        }
    }

    const toggleSubSubMenu = (subIndex) => {
        setOpenSubSubIndex(openSubSubIndex === subIndex ? null : subIndex)
    }

    return (
        <div className="bg-white sticky top-0 z-50 ">
            {/* Top bar */}
            <div className="py-4 w-11/12 md:w-10/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Logo */}
                <div className="flex items-center gap-3 select-none cursor-default">
                    <div className="bg-blue-50 p-2 rounded-xl transition duration-300">
                        <Menu className="text-blue-600 w-6 h-6" />
                    </div>
                    <h2 className="text-blue-600 font-extrabold text-2xl">NijerDokan</h2>
                </div>

                {/* Search */}
                <div className="relative flex-grow max-w-md w-full md:w-auto">
                    <Search className="text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <Input
                        type="search"
                        placeholder="Search essentials, Groceries and more..."
                        className="bg-blue-50 py-3 border-0 rounded-xl pl-10 pr-10 focus:ring-2 focus:ring-blue-400 transition w-full"
                    />
                    <TableOfContents
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 rotate-180 cursor-pointer"
                        aria-label="Toggle menu"
                    />
                </div>

                {/* Sign In & Cart */}
                <div className="flex items-center gap-8 whitespace-nowrap">
                    <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition duration-200">
                        <User className="text-blue-600" />
                        <h3 className="text-sm font-semibold">Sign Up / Sign In</h3>
                    </div>

                    <div className="flex items-center cursor-pointer hover:text-blue-600 transition duration-200">
                        <ShoppingCart className="text-blue-600" />
                        <h3 className="text-sm font-semibold ml-1">Cart</h3>
                    </div>
                </div>
            </div>

            {/* Nav menu */}
            <nav className="border-t border-b border-gray-200 bg-white py-3 mb-4">
                <ul className="w-11/12 md:w-10/12 mx-auto flex justify-center gap-6 select-none">
                    {menuData.map((item, index) => (
                        <li key={index} className="relative">
                            <button
                                type="button"
                                onClick={() => toggleSubMenu(index)}
                                className={`
                                    flex items-center gap-1 font-semibold rounded-md px-4 py-2
                                    transition duration-300
                                    ${openSubIndex === index
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-50 text-blue-700 hover:bg-blue-500 hover:text-white"
                                    }
                                `}
                            >
                                {item.label}
                                <ChevronDown
                                    className={`h-5 w-5 transition-transform duration-300 ${openSubIndex === index ? "rotate-180 text-white" : "rotate-0 text-blue-500"
                                        }`}
                                />
                            </button>

                            {openSubIndex === index && (
                                <ul
                                    className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-5 w-72 md:w-80 z-50 border border-gray-200"
                                    onMouseLeave={() => {
                                        setOpenSubIndex(null)
                                        setOpenSubSubIndex(null)
                                    }}
                                >
                                    {item.children.map((sub, subIndex) => (
                                        <li key={subIndex} className="mb-3 last:mb-0">
                                            <div
                                                onClick={() => toggleSubSubMenu(`${index}-${subIndex}`)}
                                                className="flex justify-between items-center cursor-pointer font-medium text-gray-700 hover:text-blue-600 transition duration-150 select-none"
                                            >
                                                {sub.label}
                                                {sub.children && (
                                                    <ChevronDown
                                                        className={`h-4 w-4 transition-transform duration-300 ${openSubSubIndex === `${index}-${subIndex}`
                                                            ? "rotate-180 text-blue-600"
                                                            : "rotate-0 text-gray-400"
                                                            }`}
                                                    />
                                                )}
                                            </div>

                                            {openSubSubIndex === `${index}-${subIndex}` && sub.children && (
                                                <ul className="mt-2 ml-4 list-disc list-inside text-sm text-gray-600 space-y-1 border-l border-gray-300 pl-3">
                                                    {sub.children.map((c, j) => (
                                                        <li key={j} className="hover:text-blue-600 transition duration-150">
                                                            <Link href={c.href}>{c.label}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

const menuData = [
    {
        label: "Clothing",
        children: [
            {
                label: "Men's Wear",
                children: [
                    { label: "T-Shirts", href: "#" },
                    { label: "Jeans", href: "#" },
                    { label: "Jackets", href: "#" },
                ],
            },
            {
                label: "Women's Wear",
                children: [
                    { label: "Kurtis", href: "#" },
                    { label: "Sarees", href: "#" },
                    { label: "Tops", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Foods and beverage",
        children: [
            {
                label: "Snacks",
                children: [
                    { label: "Chips", href: "#" },
                    { label: "Biscuits", href: "#" },
                ],
            },
            {
                label: "Drinks",
                children: [
                    { label: "Juices", href: "#" },
                    { label: "Soda", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Plastics",
        children: [
            {
                label: "Home Use",
                children: [
                    { label: "Buckets", href: "#" },
                    { label: "Containers", href: "#" },
                ],
            },
            {
                label: "Industrial Use",
                children: [
                    { label: "Tanks", href: "#" },
                    { label: "Pipes", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Fabrics",
        children: [
            {
                label: "Raw Fabrics",
                children: [
                    { label: "Cotton", href: "#" },
                    { label: "Silk", href: "#" },
                ],
            },
            {
                label: "Finished Fabrics",
                children: [
                    { label: "Curtains", href: "#" },
                    { label: "Bedsheets", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Chemicals",
        children: [
            {
                label: "Household Chemicals",
                children: [
                    { label: "Cleaners", href: "#" },
                    { label: "Detergents", href: "#" },
                ],
            },
            {
                label: "Industrial Chemicals",
                children: [
                    { label: "Solvents", href: "#" },
                    { label: "Lubricants", href: "#" },
                ],
            },
        ],
    },
]
