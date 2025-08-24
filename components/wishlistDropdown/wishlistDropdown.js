"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WishlistDropdown() {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([
            { id: 1, title: "Wireless Headphones", href: "/product/1", image: "/images/headphones.jpg" },
            { id: 2, title: "Smart Watch", href: "/product/2", image: "/images/smartwatch.jpg" },
            { id: 3, title: "Bluetooth Speaker", href: "/product/3", image: "/images/speaker.jpg" }
        ]);
    }, []);

    return (
        <div className="w-72 bg-white border border-gray-200 shadow-lg rounded-md z-50">
            <ul className="divide-y divide-gray-100 ">
                {items.length === 0 ? (
                    <li className="p-4 text-center text-gray-500">{t('your_wishlist_is_empty')}</li>
                ) : (
                    items.map(item => (
                        <li key={item.id} className="flex items-center p-3 hover:bg-gray-50">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 rounded object-cover mr-3 flex-shrink-0"
                            />
                            <Link href={item.href} className="flex-1 text-gray-800 hover:text-blue-600 truncate">
                                {item.title}
                            </Link>
                            <button className="ml-2 p-1 text-red-500 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </li>
                    ))
                )}
            </ul>
            <div className="p-3 text-center bg-blue-600 mx-4 rounded-md mb-2">
                <Link href="/wishlist" className="text-white font-medium">
                    View All
                </Link>
            </div>
        </div>
    );
}
