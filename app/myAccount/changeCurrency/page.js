"use client"

import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function ChangeCurrency() {
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        fetch("/data/currencies.json")
            .then(res => res.json())
            .then(data => {
                const payableCurrencies = data.currencies.filter(item => item.is_payable)

                // Map to add flag paths dynamically
                const formatted = payableCurrencies.map(currency => ({
                    ...currency,
                    flag: `/flags/${currency.code.toLowerCase()}.svg`,
                }))

                setCurrencies(formatted)
            })
            .catch(error => console.error("Error fetching currencies:", error))
    }, [])

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">🌐 Change Currency</h2>
            <p className="text-sm text-gray-600 mb-4">
                Select your preferred currency for shopping.
            </p>

            <div className="max-h-96 overflow-y-auto pr-1 custom-scroll space-y-2">
                <RadioGroup defaultValue="bdt" className="space-y-2">
                    {currencies.map(currency => (
                        <label
                            key={currency.code}
                            htmlFor={currency.code}
                            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3 cursor-pointer border"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value={currency.code.toLowerCase()} id={currency.code} />
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
