"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, User, Heart, TableOfContents, Bell, LogOut } from "lucide-react"
import { Input } from "../ui/input"
import CartDropdown from "../cartDropDown/cartDropDown"
import { useTranslation } from "react-i18next"
import { WishlistDropdown } from "../wishlistDropdown/wishlistDropdown"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/authContext/useAuth"

export function Navbar() {
    const { t } = useTranslation()
    const pathname = usePathname()

    const [openCategories, setOpenCategories] = useState(false)
    const [openSubcategory, setOpenSubcategory] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuData, setMenuData] = useState([])
    const [wishlistOpen, setWishlistOpen] = useState(false)
    const router = useRouter()
    const {sessionUser, setSessionUser} = useAuth()
    const toggleSubcategory = (label) =>
        setOpenSubcategory(openSubcategory === label ? null : label)

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "My Account", href: "/myAccount" },
        { label: "Categories", href: "/categories" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact Us", href: "/contact" },
    ]

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

    

    const logOut = async () =>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/logout`,{
                method:"POST",
                headers:{
                    "Content-type" : "application/json",
                    "x-vendor-identifier": "cmev38g4z000064vhktlpkq9z",
                    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json();
            console.log("Logout Response:",data)
            if(res.ok){
                alert("Logout Successful")
                router.push("/auth/signup");
                localStorage.removeItem("accessToken")
                setSessionUser(null)
            }else{
                alert(data.message || "Logout failed");
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4">
                <h2 className="text-blue-600 font-extrabold text-xl">
                    My Website
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
                    {
                        sessionUser ? 
                <button onClick={logOut} className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <LogOut className="text-blue-600" />
                    <h6>{t('logout')}</h6>
                </button> : <Link href="/auth/signup" className="flex items-center gap-2 hover:text-blue-600">
                        <User className="text-blue-600" />
                        <span className="text-sm md:font-semibold">
                            {sessionUser ? sessionUser.name : `${t("register")}/ ${t("login")}`}
                        </span>
                    </Link>
                    }
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
                        </div>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded hover:bg-blue-700"
                        >
                            <TableOfContents className="w-5 h-5" />
                        </button>
                    </div>

                    <nav
                        className={`flex flex-wrap gap-2 md:gap-3 font-medium text-sm md:text-base ${menuOpen ? "flex" : "hidden"} md:flex`}
                    >
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <span className="px-3 py-1 rounded-md hover:bg-blue-800 transition cursor-pointer">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}
