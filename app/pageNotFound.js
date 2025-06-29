"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-4">
            <h1 className="text-7xl font-extrabold text-blue-700 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>
            <Link href="/">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}
