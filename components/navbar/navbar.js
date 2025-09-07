"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, User, TableOfContents, LogOut, ChevronDown } from "lucide-react"
import { Input } from "../ui/input"
import CartDropdown from "../cartDropDown/cartDropDown"
import { useTranslation } from "react-i18next"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/authContext/useAuth"

export function Navbar() {
    const { t } = useTranslation()
    const pathname = usePathname()

    const [openCategories, setOpenCategories] = useState(false)
    const [openSubcategory, setOpenSubcategory] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuData, setMenuData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)
    const router = useRouter()
    const { sessionUser, setSessionUser } = useAuth()

    const toggleSubcategory = (label) =>
        setOpenSubcategory(openSubcategory === label ? null : label)

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "My Account", href: "/myAccount" },
        { label: "Categories", href: "/categories" },
        // { label: "FAQ", href: "/faq" },
        // { label: "Contact Us", href: "/contact" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
                const result = await res.json()
                if (result.success) {
                    const categories = result.data

                    const parents = categories.filter((c) => !c.parent)

                    setMenuData(
                        parents.map((parent) => {
                            const children = categories.filter((child) =>
                                parent.children?.some(
                                    (childId) => String(childId) === String(child._id)
                                )
                            )

                            return {
                                label: parent.title,
                                slug: parent.slug,
                                children: children.map((child) => ({
                                    label: child.title,
                                    slug: child.slug
                                }))
                            }
                        })
                    )
                } else {
                    console.error("Failed to fetch categories:", result.error)
                }
            } catch (err) {
                console.error("Categories fetch error:", err)
            }
        }

        fetchCategories()
    }, [])

    const logOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/logout`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-vendor-identifier": "cmev38g4z000064vhktlpkq9z",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            if (res.ok) {
                alert("Logout Successful")
                router.push("/auth/signup")
                localStorage.removeItem("accessToken")
                setSessionUser(null)
            } else {
                alert(data.message || "Logout failed")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
                : "bg-white shadow-md"
                }`}
        >
            {/* Main Header */}
            <div className="w-11/12 max-w-7xl mx-auto">
                <div className="flex items-center justify-between py-4 lg:py-6">
                    {/* Logo */}
                    <Link href="/" className="group">
                        <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-indigo-500 transition-all duration-300">
                            Nijer Dokan
                        </h2>
                    </Link>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex relative flex-grow max-w-xl mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                            <Input
                                type="search"
                                placeholder={t("search_placeholder")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && searchTerm.trim() !== "") {
                                        router.push(`/shop/search?q=${encodeURIComponent(searchTerm.trim())}`)
                                    }
                                }}
                                className="w-full pl-12 pr-12 py-3 bg-gray-50 border-0 rounded-2xl text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-300"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <TableOfContents className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 rotate-180 cursor-pointer transition-colors duration-200" />
                            </div>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Mobile Search Button */}
                        <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Cart */}
                        {pathname !== "/myCart" && (
                            <div className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
                                <CartDropdown />
                                <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                                    {t("cart")}
                                </span>
                            </div>
                        )}

                        {/* User Account / Auth */}
                        {sessionUser ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                                        {sessionUser.name}
                                    </span>
                                </div>
                                <button
                                    onClick={logOut}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
                                >
                                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="hidden lg:block text-sm font-medium">{t("logout")}</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth/signup"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden lg:block">
                                    {t("register")} / {t("login")}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg">
                <div className="w-11/12 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between py-3">
                        {/* Categories Button */}
                        <div className="relative">
                            <button
                                onClick={() => setOpenCategories(!openCategories)}
                                className="flex items-center gap-2 font-semibold px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-105 border border-white/20"
                            >
                                <Menu className="w-5 h-5" />
                                <span className="hidden sm:block">{t("categories")}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openCategories ? "rotate-180" : ""}`} />
                            </button>

                            {/* Categories Dropdown */}
                            {openCategories && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                                    <div className="p-2">
                                        {menuData.map((category, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between">
                                                    {category.children.length === 0 ? (
                                                        <Link
                                                            href={`/shop?category=${encodeURIComponent(category.slug)}`}
                                                            className="flex-1 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 font-medium"
                                                            onClick={() => setOpenCategories(false)}
                                                        >
                                                            {category.label}
                                                        </Link>
                                                    ) : (
                                                        <span className="flex-1 px-4 py-3 text-gray-700 font-medium">
                                                            {category.label}
                                                        </span>
                                                    )}

                                                    {category.children.length > 0 && (
                                                        <button
                                                            onClick={() => toggleSubcategory(category.label)}
                                                            className="px-3 py-2 text-gray-600 hover:text-blue-700 transition-colors duration-200"
                                                        >
                                                            <ChevronDown
                                                                className={`w-4 h-4 transition-transform duration-200 ${openSubcategory === category.label ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Subcategories */}
                                                {openSubcategory === category.label && category.children.length > 0 && (
                                                    <div className="ml-6 mt-1 space-y-1">
                                                        {category.children.map((child, idx) => (
                                                            <Link
                                                                key={idx}
                                                                href={`/shop?category=${encodeURIComponent(child.slug)}`}
                                                                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 text-sm"
                                                                onClick={() => setOpenCategories(false)}
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                        >
                            <TableOfContents className="w-5 h-5" />
                        </button>

                        {/* Navigation Links */}
                        <nav
                            className={`${menuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 md:bg-none flex-col md:flex-row gap-1 md:gap-2 p-4 md:p-0 rounded-b-2xl md:rounded-none shadow-xl md:shadow-none border-t border-white/20 md:border-none`}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link key={link.href} href={link.href}>
                                        <span
                                            className={`block px-4 py-3 md:py-2 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 cursor-pointer ${isActive
                                                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                                                : "text-white/90 hover:text-white hover:bg-white/10 hover:shadow-md hover:scale-105"
                                                }`}
                                        >
                                            {link.label}
                                        </span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {(menuOpen || openCategories) && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => {
                        setMenuOpen(false)
                        setOpenCategories(false)
                    }}
                />
            )}
        </header>
    )
}
