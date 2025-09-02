"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { ProductDetailsTabs } from "@/components/productDetailsTabs/productDetailsTabs";
import { SimilarProductsSection } from "@/components/similarProductsSection/similarProductSections";

export default function ProductDetail({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartMessage, setCartMessage] = useState(null);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchProduct = async () => {
            try {
                const { id } = await params;
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`, {
                    headers: {
                        "x-vendor-identifier": "cmefk8met0003609worbmn4v0",
                    },
                    cache: "no-store",
                });

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Failed to fetch product: ${text}`);
                }

                const data = await res.json();
                if (!data.success) throw new Error(data.error || "Failed to fetch product");

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
    console.log(product)

    const handleAddToCart = async () => {
        console.log("helloooooooooooooooooooooooo")
        if (!product?.id) {
            console.log("not Product Id")
        }
        const accessToken = localStorage.getItem("accessToken")

        // setAdding(true);
        setCartMessage(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "x-vendor-identifier": "cmefk8met0003609worbmn4v0",
                },
                body: JSON.stringify({
                    productId: product.id.toString(),
                    variantId: product.variants?.[0]?.options?.[0]?._id,
                    quantity: 1,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to add item");

            setCartMessage(data.message || "Item added to cart!");
        } catch (err) {
            setCartMessage(err.message);
        } finally {
            // setAdding(false);
        }
    };


    if (loading)
        return (
            <div className="w-11/12 md:w-10/12 mx-auto py-8">
                <h2 className="text-lg">Loading product details...</h2>
            </div>
        );

    if (error)
        return (
            <div className="w-11/12 md:w-10/12 mx-auto py-8">
                <h2 className="text-xl text-red-600">Failed to load product: {error}</h2>
            </div>
        );

    if (!product) return null;

    const productUI = {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price?.base || 0,
        inStock: product.status === "active" && product.inventory?.sku,
        rating: product.ratings?.average || 0,
        reviews: product.ratings?.count || 0,
        sizes: product.variants?.length ? product.variants.map((v) => v.options?.[0]) : [],
        colors: ["#f87171", "#60a5fa", "#34d399"],
        category: product.category?.name || "Electronics",
        subcategory: product.subcategory?.name || "Smartphones",
    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div>
                    {/* <Image
                        src={productUI.image}
                        alt={productUI.title}
                        width={500}
                        height={500}
                        className="rounded-lg shadow-md w-full object-cover"
                    /> */}
                </div>

                {/* Product Info */}
                <div>
                    {/* Category */}
                    <div className="mb-6">
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <span className="hover:text-blue-600 cursor-pointer">Category</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="hover:text-blue-600 cursor-pointer">{productUI.category}</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-gray-800 font-medium">{productUI.subcategory}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{productUI.title}</h1>

                    {/* Rating */}
                    <div className="flex items-center text-sm text-yellow-500 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(productUI.rating) ? "" : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-gray-600 ml-2">
                            {productUI.rating.toFixed(1)} ({productUI.reviews} reviews)
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">{productUI.description}</p>

                    {/* Sizes */}
                    {productUI.sizes.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Select Size</h4>
                            <div className="flex gap-2 flex-wrap">
                                {productUI.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className="px-3 py-1 border border-gray-300 rounded hover:bg-blue-100 text-sm"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Available Colors</h4>
                        <div className="flex gap-3">
                            {productUI.colors.map((color, i) => (
                                <span
                                    key={i}
                                    className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    {/* <div className="mb-4">
                        <p className="text-sm font-medium">
                            Status:{" "}
                            <span className={`font-semibold ${productUI.inStock ? "text-green-600" : "text-red-500"}`}>
                                {productUI.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>
                    </div> */}

                    {/* Price & Add to Cart */}
                    <div className="flex items-center mt-6 flex-wrap gap-4">
                        <button
                            onClick={handleAddToCart}
                            // disabled={adding}
                            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Add to Cart
                        </button>
                        <div className="text-2xl font-bold text-blue-700 border border-blue-600 px-4 py-2 rounded-md">
                            {productUI.price.toLocaleString()}৳
                        </div>
                    </div>

                    {/* Cart message */}
                    {cartMessage && (
                        <p className="mt-3 text-sm font-medium text-gray-700">{cartMessage}</p>
                    )}
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="py-10 mt-20">
                <ProductDetailsTabs />
            </div>

            {/* Similar Products */}
            {/* <SimilarProductsSection /> */}
        </div>
    );
}
