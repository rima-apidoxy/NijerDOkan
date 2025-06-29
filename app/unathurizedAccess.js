"use client"

import { Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-4">
            <Lock className="w-16 h-16 text-yellow-500 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
                You don’t have permission to view this page.
            </p>
            <Link href="/">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Go to Home
                </Button>
            </Link>
        </div>
    )
}
