'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function CategoryCards() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
                    // headers: {
                    //     'x-vendor-identifier': vendorIdentifier
                    // }
                })
                const data = await res.json()
                if (data.success) {
                    // Filter top-level categories (parent = null)
                    const topCategories = data.data.filter(cat => cat.parent === null)
                    setCategories(topCategories)
                } else {
                    throw new Error(data.error || "Failed to fetch categories")
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching categories")
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    if (loading) return <p className="text-center mt-10">Loading categories...</p>
    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>

    return (
        <div className="w-11/12 max-w-7xl mx-auto my-10">
            <h1 className="text-2xl font-bold mb-6">Browse Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Link
                        key={cat._id}
                        href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                        className="hover:shadow-xl transition-shadow duration-200 rounded-xl"
                    >
                        <Card className="rounded-xl">
                            <CardContent className="p-4 flex flex-col items-center">
                                {cat.image?.imageName ? (
                                    <Image
                                        src={`http://localhost:3000/${cat.image.imageName}`} // adjust your image URL if needed
                                        alt={cat.title}
                                        width={100}
                                        height={100}
                                        className="mb-3"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-200 mb-3 rounded-full"></div>
                                )}
                                <h4 className="text-md font-semibold text-center">{cat.title}</h4>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
