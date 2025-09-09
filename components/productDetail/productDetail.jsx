"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Star,
    ShoppingCart,
    Heart,
    Minus,
    Plus,
    Shield,
    Truck,
    RotateCcw,
    Check,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { useCart } from "@/app/context/CartContext"

export default function ProductDetail({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adding, setAdding] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { setCartCount, setCartItems } = useCart()

    useEffect(() => {
        let isMounted = true;
        const fetchProduct = async () => {
            try {
                const { id } = await params;
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
                    { cache: "no-store" }
                );

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Failed to fetch product: ${text}`);
                }

                const data = await res.json();
                if (!data.success)
                    throw new Error(data.error || "Failed to fetch product");

                if (isMounted) {
                    setProduct(data.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProduct();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleAddToCart = async () => {
        if (product?.variants?.length > 0 && !selectedVariant) {
            toast.error("Please select a variant option before adding to cart!");
            return;
        }
        if (!product?.id) return;
        const accessToken = localStorage.getItem("accessToken");
        setAdding(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/item`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        variantId: selectedVariant?.variantId || null,
                        option: selectedVariant?.option || null,
                        quantity,
                        shop: product.shop
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to add item");

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
            setAdding(false);
        }
    };

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <div className="animate-pulse max-w-7xl w-full mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-4">
                            <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl shadow-2xl"></div>
                            <div className="flex gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8 pt-8">
                            <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl w-4/5"></div>
                            <div className="h-8 bg-slate-200 rounded-xl w-1/3"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
                                <div className="h-4 bg-slate-200 rounded-lg w-4/5"></div>
                                <div className="h-4 bg-slate-200 rounded-lg w-3/5"></div>
                            </div>
                            <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
                <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md mx-6 border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Oops! Something went wrong
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const isInStock = product.status === "active" && product.inventory?.sku;
    const hasDiscount =
        product.price?.compareAt &&
        product.price.compareAt > product.price.base;
    const discountPercentage = hasDiscount
        ? Math.round(
            ((product.price.compareAt - product.price.base) /
                product.price.compareAt) *
            100
        )
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Hero Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                        {/* Left: Product Gallery */}
                        <div className="space-y-6">
                            {/* Main Image */}
                            <div className="relative group">
                                <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${product.shop}/${product.gallery?.[0]?.fileName}`}
                                        alt={product.title}
                                        width={700}
                                        height={700}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />

                                    {/* Floating Badges */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                                        {hasDiscount && (
                                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg border-0 backdrop-blur-sm">
                                                <Zap className="w-4 h-4 mr-1" />
                                                {discountPercentage}% OFF
                                            </Badge>
                                        )}
                                        {product.isFeatured && (
                                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg border-0 backdrop-blur-sm">
                                                <Star className="w-4 h-4 mr-1 fill-current" />
                                                Featured
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Wishlist Button */}
                                    {/* <button
                                        onClick={toggleWishlist}
                                        className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
                                    >
                                        <Heart
                                            className={`w-5 h-5 transition-colors duration-300 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
                                                }`}
                                        />
                                    </button> */}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {/* <div className="flex gap-4 overflow-x-auto pb-2">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${product.shop}/${product.gallery?.[0]?.fileName}`}
                                                alt={`${product.title} view ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </div>

                        {/* Right: Product Details */}
                        <div className="space-y-8 lg:pt-8">
                            {/* Title & Rating */}
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                                    {product.title}
                                </h1>

                                {/* <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 font-medium">4.9 (128 reviews)</span>
                                </div> */}
                            </div>

                            {/* Price Section */}
                            <div className="space-y-3">
                                <div className="flex items-baseline gap-6">
                                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        ৳{product.price?.base?.toLocaleString()}
                                    </span>
                                    {hasDiscount && (
                                        <div className="flex flex-col">
                                            <span className="text-2xl text-gray-400 line-through font-medium">
                                                ৳{product.price.compareAt?.toLocaleString()}
                                            </span>
                                            <span className="text-sm text-green-600 font-semibold">
                                                You save ৳{(product.price.compareAt - product.price.base).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span className="text-green-600 font-semibold">In Stock & Ready to Ship</span>
                                </div> */}
                            </div>

                            {/* Description */}
                            <div className="prose prose-gray max-w-none">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Variants */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="space-y-6">
                                    {product.variants.map((variant) => (
                                        <div key={variant.id} className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Choose {variant?.name}
                                            </h3>
                                            <div className="flex gap-3 flex-wrap">
                                                {variant.options?.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            setSelectedVariant({
                                                                variantId: variant.id, // ✅ keep this consistent
                                                                option
                                                            })
                                                        }
                                                        className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border-2 
      ${selectedVariant?.variantId === variant.id && selectedVariant?.option === option
                                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white  shadow-lg transform scale-105"
                                                                : "bg-white border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50 hover:scale-105 shadow-sm"
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity Selector */}
                            {/* <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="p-4 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="px-6 py-4 text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="p-4 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div> */}

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-4">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={adding || !isInStock}
                                    className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl shadow-xl border-0 transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <ShoppingCart className="w-6 h-6 mr-3" />
                                    {adding ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Adding to Cart...
                                        </span>
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </Button>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}