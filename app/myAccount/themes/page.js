"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const themeColors = [
    { code: "zinc", label: "Zinc", color: "bg-zinc-500" },
    { code: "slate", label: "Slate", color: "bg-slate-500" },
    { code: "red", label: "Red", color: "bg-red-500" },
    { code: "rose", label: "Rose", color: "bg-rose-500" },
    { code: "orange", label: "Orange", color: "bg-orange-500" },
    { code: "green", label: "Green", color: "bg-green-500" },
    { code: "blue", label: "Blue", color: "bg-blue-500" },
    { code: "yellow", label: "Yellow", color: "bg-yellow-500" },
    { code: "violet", label: "Violet", color: "bg-violet-500" },
]

export default function ThemeColorSelector() {
    return (
        <div className="w-11/12">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Theme Color</h2>
            <p className="text-sm text-gray-600 mb-4">
                Select your preferred accent color.
            </p>

            <RadioGroup defaultValue="blue" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {themeColors.map((theme) => (
                    <label
                        key={theme.code}
                        htmlFor={theme.code}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3 cursor-pointer border"
                    >
                        <RadioGroupItem value={theme.code} id={theme.code} />
                        <div className={`w-5 h-5 rounded-full ${theme.color}`}></div>
                        <span className="text-gray-700">{theme.label}</span>
                    </label>
                ))}
            </RadioGroup>
        </div>
    )
}
