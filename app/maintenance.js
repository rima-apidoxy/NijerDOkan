"use client"

import { Clock } from "lucide-react"

export default function MaintenancePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-blue-50 to-white px-4">
            <Clock className="w-16 h-16 text-blue-600 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">We’ll be back soon!</h1>
            <p className="text-gray-600 max-w-md">
                Our website is currently undergoing scheduled maintenance to improve your shopping experience.
            </p>
            <p className="text-gray-500 mt-2">Thank you for your patience.</p>
        </div>
    )
}
