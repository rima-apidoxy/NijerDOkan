"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Star,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

export default function ProductDetail({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adding, setAdding] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

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

            toast.success(data.message || 'Item added to cart!');

        } catch (err) {
            toast.error(err.message);

        } finally {
            setAdding(false);
        }
    };




    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse space-y-6 w-10/12 lg:w-8/12">
                    <div className="h-96 bg-gray-200 rounded-3xl"></div>
                    <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">
                        Failed to load product
                    </h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!product) return null;
    { product.variants.map((variant) => console.log(variant)) }
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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Product Image */}
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${product.shop}/${product.gallery?.[0]?.fileName}`}
                            alt={product.title}
                            width={700}
                            height={700}
                            className="w-full h-[500px] object-cover"
                            priority
                        />
                        {hasDiscount && (
                            <Badge className="absolute top-5 left-5 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                                -{discountPercentage}%
                            </Badge>
                        )}
                        {product.isFeatured && (
                            <Badge className="absolute top-5 right-5 bg-yellow-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                                Featured
                            </Badge>
                        )}
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-6">
                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900 leading-snug tracking-tight">
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-blue-700">
                                ৳{product.price?.base?.toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <span className="text-xl text-gray-400 line-through">
                                    ৳{product.price.compareAt?.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex gap-3 flex-wrap">
                                    {product.variants.map((variant) => (
                                        <div key={variant.id}>
                                            <h3 className="font-semibold text-gray-800">{variant?.name}</h3>
                                            <div className="flex gap-2 flex-wrap">
                                                {variant.options?.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            setSelectedVariant({
                                                                variantId: variant.id,
                                                                option
                                                            })
                                                        }
                                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition shadow-sm ${selectedVariant?.variantId === variant._id &&
                                                            selectedVariant?.option === option
                                                            ? "bg-blue-600 text-white shadow-md"
                                                            : "bg-white border border-gray-300 text-gray-800 hover:border-blue-400"
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="pt-4">
                            <Button
                                onClick={handleAddToCart}
                                disabled={adding || !isInStock}
                                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg disabled:opacity-50"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {adding ? "Adding..." : "Add to Cart"}
                            </Button>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
