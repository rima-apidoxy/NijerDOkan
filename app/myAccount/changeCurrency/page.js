"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

const currencies = [
    { code: "bdt", name: "Bangladeshi Taka", symbol: "৳", flag: "/flags/bd.svg" },
    { code: "usd", name: "United States Dollar", symbol: "$", flag: "/flags/us.svg" },
    { code: "eur", name: "Euro", symbol: "€", flag: "/flags/eu.svg" },
    { code: "jpy", name: "Japanese Yen", symbol: "¥", flag: "/flags/jp.svg" },
    { code: "gbp", name: "British Pound Sterling", symbol: "£", flag: "/flags/gb.svg" },
    { code: "inr", name: "Indian Rupee", symbol: "₹", flag: "/flags/in.svg" },
    { code: "cad", name: "Canadian Dollar", symbol: "$", flag: "/flags/ca.svg" },
    { code: "aud", name: "Australian Dollar", symbol: "$", flag: "/flags/au.svg" },
    { code: "chf", name: "Swiss Franc", symbol: "Fr", flag: "/flags/ch.svg" },
    { code: "cny", name: "Chinese Yuan", symbol: "¥", flag: "/flags/cn.svg" },
    { code: "rub", name: "Russian Ruble", symbol: "₽", flag: "/flags/ru.svg" },
    { code: "brl", name: "Brazilian Real", symbol: "R$", flag: "/flags/br.svg" },
    { code: "try", name: "Turkish Lira", symbol: "₺", flag: "/flags/tr.svg" },
    { code: "krw", name: "South Korean Won", symbol: "₩", flag: "/flags/kr.svg" },
    { code: "ils", name: "Israeli New Shekel", symbol: "₪", flag: "/flags/il.svg" },
    { code: "aed", name: "United Arab Emirates Dirham", symbol: "د.إ", flag: "/flags/ae.svg" },
    { code: "zar", name: "South African Rand", symbol: "R", flag: "/flags/za.svg" },
    { code: "vnd", name: "Vietnamese Dong", symbol: "₫", flag: "/flags/vn.svg" },
    { code: "php", name: "Philippine Peso", symbol: "₱", flag: "/flags/ph.svg" },
    { code: "thb", name: "Thai Baht", symbol: "฿", flag: "/flags/th.svg" },
    { code: "aoa", name: "Angolan Kwanza", symbol: "Kz", flag: "/flags/ao.svg" },
]

export default function ChangeCurrency() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">🌐 Change Currency</h2>
            <p className="text-sm text-gray-600 mb-4">
                Select your preferred currency for shopping.
            </p>

            <div className="max-h-96 overflow-y-auto pr-1 custom-scroll space-y-2">
                <RadioGroup defaultValue="bdt" className="space-y-2">
                    {currencies.map((currency) => (
                        <label
                            key={currency.code}
                            htmlFor={currency.code}
                            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3 cursor-pointer border"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value={currency.code} id={currency.code} />
                                <Image
                                    src={currency.flag}
                                    alt={currency.name}
                                    width={24}
                                    height={24}
                                    className="rounded object-cover"
                                />
                                <span className="text-gray-700">
                                    ({currency.symbol}) {currency.name}
                                </span>
                            </div>
                        </label>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}
