"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Heart } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"
import { useCart } from "@/app/context/CartContext"

export function ProductCards() {
    const [categories, setCategories] = useState([])
    const [productsByCategory, setProductsByCategory] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [addingToCart, setAddingToCart] = useState(new Set())
    const { setCartCount, setCartItems } = useCart()

    // const { toast } = useToast()
    // const vendorIdentifier = 'cmefk8met0003609worbmn4v0'

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
                    // headers: { 'x-vendor-identifier': vendorIdentifier }
                })
                const data = await res.json()
                if (data.success) setCategories(data.data)
                else throw new Error("Failed to fetch categories")
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching categories")
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    // Fetch products per category
    useEffect(() => {
        const fetchProducts = async () => {
            if (!categories.length) return
            try {
                setLoading(true)
                const temp = {}
                await Promise.all(categories.map(async (cat) => {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=${cat._id}&limit=10`, {
                        // headers: { 'x-vendor-identifier': vendorIdentifier }
                    })
                    const data = await res.json()
                    temp[cat._id] = data.success ? data.data : []
                }))
                setProductsByCategory(temp)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching products")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [categories])



    const handleAddToCart = async (product) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("Please login to add items to cart");
            return;
        }

        setAddingToCart(prev => new Set(prev).add(product.id));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                    shop: product.shop,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to add item");

            // ✅ Re-fetch updated cart
            if (data.success) {
                const cartRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const cartData = await cartRes.json();

                if (cartRes.ok && cartData?.data) {
                    setCartItems(cartData.data);
                    setCartCount(cartData.data.itemCount || cartData.data.items?.length || 0);
                }

                toast.success(data.message || "Item added to cart!");
            }

        } catch (err) {
            toast.error(err.message);
        } finally {
            setAddingToCart(prev => {
                const updated = new Set(prev);
                updated.delete(product.id);
                return updated;
            });
        }
    };


    const formatPrice = (price, currency = 'TK') => `${currency}. ${price.toLocaleString()}`



    const calculateDiscount = (base, compareAt) => {
        if (!compareAt || compareAt <= base) return 0
        return Math.round(((compareAt - base) / compareAt) * 100)
    }

    if (loading) {
        return (
            <div className="w-11/12 md:w-10/12 mx-auto my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
                    {[...Array(10)].map((_, index) => (
                        <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                            <CardHeader className="p-0 relative">
                                <Skeleton className="h-48 w-full" />
                            </CardHeader>
                            <CardContent className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-3" />
                                <Skeleton className="h-5 w-1/2 mb-3" />
                                <Skeleton className="h-4 w-2/3 mb-4" />
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-11/12 md:w-10/12 mx-auto my-8">
                <div className="text-center py-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                    <div className="max-w-md mx-auto">
                        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-600 text-3xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-600 mb-6">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white transition-colors"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-11/12 md:w-10/12 mx-auto my-8">
            {categories.map(cat => {
                const products = productsByCategory[cat._id] || []
                if (!products.length) return null

                return (
                    <div key={cat._id} className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <div className="relative">
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                    {cat.title}
                                </h2>
                                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                            </div>
                            <Link
                                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                                className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                View All
                                <span className="transform transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map(product => {
                                const savings = product.price.compareAt ? product.price.compareAt - product.price.base : 0
                                const discountPercentage = calculateDiscount(product.price.base, product.price.compareAt)
                                const isAddingToCart = addingToCart.has(product.id)

                                return (
                                    <div key={product.id} className="group relative">
                                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                                            {/* Discount Badge */}
                                            {discountPercentage > 0 && (
                                                <div className="absolute top-3 left-3 z-20">
                                                    <Badge className="bg-red-500 text-white font-semibold px-2 py-1 text-xs">
                                                        -{discountPercentage}%
                                                    </Badge>
                                                </div>
                                            )}

                                            {/* Wishlist Button */}
                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-3 right-3 z-20 bg-white/80 hover:bg-white hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <Heart className="h-4 w-4" />
                                            </Button> */}

                                            <Link href={`/product/${product.id}`} className="block">
                                                <CardHeader className="p-0 relative">
                                                    <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${product.shop}/${product.gallery?.[0]?.fileName}`}
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                            onError={(e) => {
                                                                e.currentTarget.src = "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg";
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="">
                                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                                        {product.title}
                                                    </h3>

                                                    {/* Rating */}
                                                    {product.ratings.count > 0 && (
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-3 w-3 ${i < Math.round(product.ratings.average)
                                                                            ? "fill-yellow-400 text-yellow-400"
                                                                            : "text-gray-300"
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                ({product.ratings.count})
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Price Section */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-xl font-bold text-gray-900">
                                                                {formatPrice(product.price.base, product.price.currency)}
                                                            </span>
                                                            {product.price.compareAt && product.price.compareAt > product.price.base && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    {formatPrice(product.price.compareAt, product.price.currency)}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {savings > 0 && (
                                                            <p className="text-green-600 text-sm font-medium">
                                                                Save {formatPrice(savings, product.price.currency)}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Free Shipping Badge */}
                                                    {product.hasFreeShipment && (
                                                        <div className="flex items-center gap-1 mb-4">
                                                            <Truck className="h-3 w-3 text-green-600" />
                                                            <span className="text-xs text-green-600 font-medium">Free Shipping</span>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Link>

                                            {/* Add to Cart Button */}
                                            {/* Add to Cart OR Select Options Button */}
                                            <div className="px-5 pb-5">
                                                {product.hasVariants ? (
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="w-full"
                                                    >
                                                        <Button
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            Select Options
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleAddToCart(product)}
                                                        disabled={isAddingToCart}
                                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-70"
                                                    >
                                                        {isAddingToCart ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                Adding...
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <ShoppingCart className="h-4 w-4" />
                                                                Add to Cart
                                                            </div>
                                                        )}
                                                    </Button>
                                                )}
                                            </div>

                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}