"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServerErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-4">
            <h1 className="text-7xl font-extrabold text-red-600 mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
                We’re experiencing technical issues. Please try again later.
            </p>
            <Link href="/">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}
