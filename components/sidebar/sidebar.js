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
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
    const { t } = useTranslation();
    return (
        <aside className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2 border-l-4 border-blue-500 pl-3">{t('hello')} Rima</h2>
            <p className="text-gray-600 mb-6">{t('welcome_to_your_account')}</p>
            <nav className="flex flex-col gap-4">
                <Link href="/myAccount/" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <ShoppingBag />
                    <h6>{t('my_orders')}</h6>
                </Link>
                {/* <Link href="/myAccount/myWishlist" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <Heart />
                    <h6>{t('wishlist')}</h6>
                </Link>
                <Link href="/myAccount/changeCurrency" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <CircleDollarSign />
                    <h6>{t('currency')}</h6>
                </Link>
                <Link href="/myAccount/themes" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <Palette />
                    <h6>{t('themes')}</h6>
                </Link> */}
                <Link href="/myAccount/language" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <Languages />
                    <h6>{t('language')}</h6>
                </Link>
                <Link href="/myAccount/myInfo" className="text-left text-gray-700 font-semibold text-sm flex gap-2 hover:text-blue-600">
                    <User />
                    <h6>{t('my_info')}</h6>
                </Link>
            </nav>
        </aside>
    )
}
