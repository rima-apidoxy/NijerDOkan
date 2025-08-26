"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import SectionTitle from "../sectionTitle/sectionTitle"

export function BestSellerCards({ title}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`http://localhost:3000/api/products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()

                if (result.success) {
                    setProducts(result.data)
                } else {
                    throw new Error('Failed to fetch products')
                }
            } catch (err) {
                console.error('Error fetching products:', err)
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const calculateDiscount = (basePrice, compareAtPrice) => {
        if (!compareAtPrice || compareAtPrice <= basePrice) return 0
        return Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100)
    }

    const formatPrice = (price, currency = 'TK') => {
        return `${currency}. ${price.toLocaleString()}`
    }

    if (loading) {
        return (
            <div className="w-11/12 md:w-10/12 mx-auto my-8">
                <SectionTitle title={title} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 lg:grid-cols-5 gap-4">
                    {/* {[...Array(limit)].map((_, index) => (
                        <Card key={index} className="w-full max-w-sm shadow-md">
                            <CardHeader className="bg-gray-100 px-8 rounded-t-lg">
                                <Skeleton className="h-32 w-full rounded-lg" />
                            </CardHeader>
                            <CardContent className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2 mb-2" />
                                <Skeleton className="h-4 w-2/3" />
                            </CardContent>
                        </Card>
                    ))} */}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-11/12 md:w-10/12 mx-auto my-8">
                <SectionTitle title={title} />
                <div className="text-center py-12">
                    <p className="text-red-500 mb-4">Error loading products: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="w-11/12 md:w-10/12 mx-auto my-8">
                <SectionTitle title={title} />
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-11/12 md:w-10/12 mx-auto my-8">
            <SectionTitle title={title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 lg:grid-cols-5 gap-4">
                {products.map((product) => {
                    const discount = calculateDiscount(product.price.base, product.price.compareAt)
                    const savings = product.price.compareAt
                        ? product.price.compareAt - product.price.base
                        : 0

                    return (
                        <Card key={product.id} className="w-full max-w-sm shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="bg-gray-100 px-8 rounded-t-lg relative">
                                {discount > 0 && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg z-10">
                                        {discount}% OFF
                                    </div>
                                )}
                                <div className="flex justify-center">
                                    <Image
                                        src={product.thumbnail || product.gallery?.[0] || "/images/placeholder-product.png"}
                                        alt={product.title}
                                        width={120}
                                        height={120}
                                        className="rounded-lg object-cover"
                                        onError={(e) => { e.target.src = "/images/placeholder-product.png" }}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-lg font-semibold mb-2 line-clamp-1">
                                    {product.title}
                                </CardTitle>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-black font-bold text-md">
                                        {formatPrice(product.price.base, product.price.currency)}
                                    </span>
                                    {product.price.compareAt && product.price.compareAt > product.price.base && (
                                        <span className="line-through text-gray-400 text-sm">
                                            {formatPrice(product.price.compareAt, product.price.currency)}
                                        </span>
                                    )}
                                </div>

                                {savings > 0 && (
                                    <p className="text-green-600 text-md pt-2 font-medium border-t">
                                        Save - {formatPrice(savings, product.price.currency)}
                                    </p>
                                )}

                                {product.ratings.count > 0 && (
                                    <div className="flex items-center gap-1 mt-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>{i < Math.round(product.ratings.average) ? "★" : "☆"}</span>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ({product.ratings.count})
                                        </span>
                                    </div>
                                )}

                                {!product.sellWithOutStock && product.inventory?.quantity === 0 && (
                                    <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                                )}

                                {product.hasFreeShipment && (
                                    <p className="text-blue-600 text-sm mt-2">Free Shipping</p>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
