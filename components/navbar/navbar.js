"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, User, Heart, TableOfContents, Bell } from "lucide-react"
import { Input } from "../ui/input"
import CartDropdown from "../cartDropDown/cartDropDown"
import { useTranslation } from "react-i18next"
import { WishlistDropdown } from "../wishlistDropdown/wishlistDropdown"
import { usePathname } from "next/navigation"
import { useSite } from "../../components/siteContext"

export function Navbar() {
    const { t } = useTranslation()
    const pathname = usePathname()
    const site = useSite()

    const [openCategories, setOpenCategories] = useState(false)
    const [openSubcategory, setOpenSubcategory] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuData, setMenuData] = useState([])
    const [wishlistOpen, setWishlistOpen] = useState(false)

    const toggleSubcategory = (label) =>
        setOpenSubcategory(openSubcategory === label ? null : label)

    // dynamically use site.nav items instead of hard-coded
    const navLinks = site.navbar.map((label) => ({
        label,
        href: "/" + label.toLowerCase().replace(/\s+/g, "")
    }))

    useEffect(() => {
        fetch("/data/categories.json")
            .then((r) => r.json())
            .then((data) => {
                const top = data.collections.filter((c) => c.parent === null)
                setMenuData(
                    top.map((t) => ({
                        label: t.title,
                        children: data.collections
                            .filter((c) => c.parent === t.id)
                            .map((c) => ({ label: c.title }))
                    }))
                )
            })
    }, [])

    if (!site) return null

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4">
                <h2 className="text-blue-600 font-extrabold text-xl">
                    {site.title}
                </h2>
                <div className="relative flex-grow w-full md:max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    <Input
                        type="search"
                        placeholder={t("search_placeholder")}
                        className="bg-blue-50 border-0 rounded-full pl-10 pr-10 py-2 focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    <TableOfContents className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 rotate-180 cursor-pointer" />
                </div>
                <div className="flex items-center gap-4 md:gap-6 text-gray-700 relative">
                    <Link href="/auth" className="flex items-center gap-2 hover:text-blue-600">
                        <User className="text-blue-600" />
                        <span className="text-sm md:font-semibold">
                            {t("register")}/ {t("login")}
                        </span>
                    </Link>

                    {pathname !== "/wishlist" && (
                        <div
                            className="relative flex items-center cursor-pointer hover:text-blue-600"
                            onMouseEnter={() => setWishlistOpen(true)}
                            onMouseLeave={() => setWishlistOpen(false)}
                        >
                            <Heart className="text-blue-600" />
                            <span className="text-sm md:font-semibold ml-1">
                                {t("wishlist")}
                            </span>
                            {wishlistOpen && (
                                <div className="absolute top-full mt-2 right-0 z-50">
                                    <WishlistDropdown />
                                </div>
                            )}
                        </div>
                    )}

                    {pathname !== "/myCart" && (
                        <div className="flex items-center cursor-pointer hover:text-blue-600">
                            <CartDropdown />
                            <span className="text-sm md:font-semibold ml-1">
                                {t("cart")}
                            </span>
                        </div>
                    )}

                    <Link
                        href="/notificationSettings"
                        className="flex items-center cursor-pointer hover:text-blue-600"
                    >
                        <Bell className="text-blue-600" />
                        <span className="text-sm md:font-semibold ml-1">
                            {t("notifications")}
                        </span>
                    </Link>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mb-8">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-11/12 max-w-7xl mx-auto py-2 gap-2">
                    <div className="flex justify-between items-center gap-2">
                        <div className="relative">
                            <button
                                onClick={() => setOpenCategories(!openCategories)}
                                className="flex items-center gap-2 font-semibold px-4 py-2 hover:bg-blue-700 rounded-md bg-blue-800"
                            >
                                <Menu className="w-5 h-5" />
                                {t("categories")}
                            </button>
                            {openCategories && (
                                <div className="absolute left-0 mt-2 w-64 bg-white text-gray-800 shadow rounded z-50">
                                    <ul>
                                        {menuData.map((cat) => {
                                            const hasChildren = cat.children.length > 0
                                            const isOpen = openSubcategory === cat.label
                                            return (
                                                <li key={cat.label} className="border-b last:border-0">
                                                    <button
                                                        className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                                                        onClick={() => hasChildren && toggleSubcategory(cat.label)}
                                                    >
                                                        <span>{cat.label}</span>
                                                    </button>
                                                    {hasChildren && isOpen && (
                                                        <ul className="bg-gray-50">
                                                            {cat.children.map((sub) => (
                                                                <li
                                                                    key={sub.label}
                                                                    className="px-8 py-2 hover:bg-blue-100 cursor-pointer"
                                                                >
                                                                    {sub.label}
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
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded hover:bg-blue-700"
                        >
                            <TableOfContents className="w-5 h-5" />
                        </button>
                    </div>

                    <nav
                        className={`flex flex-wrap gap-2 md:gap-3 font-medium text-sm md:text-base ${menuOpen ? "flex" : "hidden"
                            } md:flex`}
                    >
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <a className="px-3 py-1 rounded-md hover:bg-blue-800 transition">
                                    {link.label}
                                </a>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}
