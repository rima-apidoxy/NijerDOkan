"use client";

import { MessageCircle, Info, HelpCircle, Package, Star } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductDetailsTabs({ product }) {
    const specifications = [
        { label: "SKU", value: product?.inventory?.sku },
        { label: "Barcode", value: product?.inventory?.barcode },
        { label: "Weight", value: product?.weight ? `${product.weight}kg` : null },
        { label: "Status", value: product?.status },
        { label: "Approval Status", value: product?.approvalStatus },
    ].filter(spec => spec.value);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <Tabs defaultValue="description" className="w-full">
                {/* <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:flex lg:gap-3 bg-white shadow-lg rounded-2xl p-2 border border-gray-200">
                    <TabsTrigger value="description" className="flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        <span className="hidden sm:inline font-medium">Description</span>
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span className="hidden sm:inline font-medium">Specifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Reviews</span>
                    </TabsTrigger>
                    <TabsTrigger value="qa" className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Q&A</span>
                    </TabsTrigger>
                </TabsList> */}

                {/* Description Tab */}
                <TabsContent value="description" className="mt-8">
                    <Card className="shadow-xl border-0 bg-white rounded-3xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Product Description</CardTitle>
                            <CardDescription>
                                Detailed information about this product
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 px-8 pb-8">
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed text-xl">
                                    {product?.description || "No description available for this product."}
                                </p>
                            </div>

                            {/* Tags */}
                            {/* {product?.tags && product.tags.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Tags</h4>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all duration-200">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            {/* Features */}
                            {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-6 text-lg">Key Features</h4>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                                        High-quality materials and construction
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                                        Durable and long-lasting design
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                                        Excellent value for money
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                                        Suitable for everyday use
                                    </li>
                                </ul>
                            </div> */}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Specifications Tab */}
                <TabsContent value="specifications" className="mt-8">
                    <Card className="shadow-xl border-0 bg-white rounded-3xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Product Specifications</CardTitle>
                            <CardDescription>
                                Technical details and product specifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="font-medium text-gray-700 text-lg">{spec.label}</span>
                                        <span className="text-gray-900 font-semibold text-lg">{spec.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing Details */}
                            <div className="mt-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-6 text-xl">Pricing Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 mb-2">Base Price</p>
                                        <p className="text-2xl font-bold text-gray-900">৳{product?.price?.base?.toLocaleString()}</p>
                                    </div>
                                    {product?.price?.cost && (
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-2">Cost Price</p>
                                            <p className="text-2xl font-bold text-gray-900">৳{product.price.cost.toLocaleString()}</p>
                                        </div>
                                    )}
                                    {product?.price?.compareAt && (
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-2">Compare At</p>
                                            <p className="text-2xl font-bold text-gray-900">৳{product.price.compareAt.toLocaleString()}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                    <Card className="shadow-sm border-0 bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Customer Reviews</CardTitle>
                            <CardDescription>
                                See what our customers are saying about this product
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Rating Summary */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-gray-900">
                                            {(product?.ratings?.average || 0).toFixed(1)}
                                        </div>
                                        <div className="flex items-center justify-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(product?.ratings?.average || 0)
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {product?.ratings?.count || 0} reviews
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sample Reviews */}
                            <div className="space-y-4">
                                <div className="border rounded-xl p-6 bg-white shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="font-semibold text-blue-700">JD</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Jane Doe</p>
                                                <p className="text-sm text-gray-500">Verified Purchase</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700">
                                        Excellent quality product! Exactly as described and arrived quickly.
                                        Would definitely recommend to others.
                                    </p>
                                </div>

                                <div className="border rounded-xl p-6 bg-white shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="font-semibold text-green-700">SS</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Sarah Smith</p>
                                                <p className="text-sm text-gray-500">Verified Purchase</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 text-yellow-400 fill-current"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700">
                                        Perfect! Great value for money and the quality exceeded my expectations.
                                        Fast delivery and excellent customer service.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Q&A Tab */}
                <TabsContent value="qa" className="mt-6">
                    <Card className="shadow-sm border-0 bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Questions & Answers</CardTitle>
                            <CardDescription>
                                Find answers to frequently asked questions about this product
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold text-sm">Q</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-2">
                                            What is the warranty period for this product?
                                        </p>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-600 font-bold text-sm">A</span>
                                            </div>
                                            <p className="text-gray-700">
                                                This product comes with a standard 1-year manufacturer warranty
                                                covering defects in materials and workmanship.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold text-sm">Q</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-2">
                                            Is this product suitable for daily use?
                                        </p>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-600 font-bold text-sm">A</span>
                                            </div>
                                            <p className="text-gray-700">
                                                Yes, this product is designed for regular daily use and
                                                has been tested for durability and performance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold text-sm">Q</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-2">
                                            What are the available shipping options?
                                        </p>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-600 font-bold text-sm">A</span>
                                            </div>
                                            <p className="text-gray-700">
                                                We offer standard shipping (3-5 business days) and express
                                                shipping (1-2 business days). Free shipping on orders over ৳500.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Specifications Tab */}
                <TabsContent value="specifications" className="mt-6">
                    <Card className="shadow-sm border-0 bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Product Specifications</CardTitle>
                            <CardDescription>
                                Technical details and product information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                                        <span className="font-medium text-gray-700">{spec.label}</span>
                                        <span className="text-gray-900 font-semibold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Variants Information */}
                            {product?.variants && product.variants.length > 0 && (
                                <div className="mt-10">
                                    <h4 className="font-semibold text-gray-900 mb-6 text-xl">Available Variants</h4>
                                    <div className="space-y-4">
                                        {product.variants.map((variant, index) => (
                                            <div key={variant.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900 text-lg">
                                                        Variant {index + 1}
                                                    </span>
                                                    <Badge variant="outline">
                                                        <span className="font-medium">{variant.options?.[0] || "Standard"}</span>
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                    <Card className="shadow-sm border-0 bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Customer Reviews</CardTitle>
                            <CardDescription>
                                Read reviews from verified customers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Rating Overview */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Rating</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-3xl font-bold text-gray-900">
                                                {(product?.ratings?.average || 0).toFixed(1)}
                                            </span>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${i < Math.floor(product?.ratings?.average || 0)
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-1">
                                            Based on {product?.ratings?.count || 0} reviews
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Individual Reviews */}
                            <div className="space-y-4">
                                <div className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <span className="font-bold text-white">JD</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Jane Doe</p>
                                                <p className="text-sm text-gray-500">Verified Purchase • 2 days ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Amazing product quality! The build is solid and it works exactly as expected.
                                        Delivery was fast and packaging was excellent. Highly recommended!
                                    </p>
                                </div>

                                <div className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                                <span className="font-bold text-white">SS</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Sarah Smith</p>
                                                <p className="text-sm text-gray-500">Verified Purchase • 1 week ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 text-yellow-400 fill-current"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Perfect! Great value for money and the quality exceeded my expectations.
                                        The customer service was also very helpful when I had questions.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Q&A Tab */}
                <TabsContent value="qa" className="mt-6">
                    <Card className="shadow-sm border-0 bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Questions & Answers</CardTitle>
                            <CardDescription>
                                Get answers to common questions about this product
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">Q</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-3">
                                            What is the return policy for this product?
                                        </p>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-sm">A</span>
                                            </div>
                                            <p className="text-gray-700">
                                                We offer a 30-day return policy for all products. Items must be in
                                                original condition with all packaging and accessories included.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">Q</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-3">
                                            How long does shipping typically take?
                                        </p>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-sm">A</span>
                                            </div>
                                            <p className="text-gray-700">
                                                Standard shipping takes 3-5 business days, while express shipping
                                                takes 1-2 business days. Free shipping is available on orders over ৳500.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-colors cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">Q</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-3">
                                            Is this product compatible with other accessories?
                                        </p>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-sm">A</span>
                                            </div>
                                            <p className="text-gray-700">
                                                Yes, this product is designed to be compatible with most standard
                                                accessories. Please check the specifications tab for detailed compatibility information.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}