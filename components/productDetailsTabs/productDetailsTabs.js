"use client"

import { MessageCircle, Info, HelpCircle } from "lucide-react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"

export function ProductDetailsTabs() {
    return (
        <div className="w-full">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="flex flex-wrap gap-2">
                    <TabsTrigger value="description" className="flex items-center gap-2">
                        <Info className="w-4 h-4" /> Description
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" /> Reviews
                    </TabsTrigger>
                    <TabsTrigger value="qa" className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" /> Q&A
                    </TabsTrigger>
                </TabsList>

                {/* Description Tab */}
                <TabsContent value="description">
                    <Card className="shadow-none border-none">
                        <CardHeader className="px-0">
                            <CardTitle className="mt-4 text-xl font-bold">Product Description</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <p className="text-sm text-gray-700 mb-4">
                                100% Bio-washed Cotton – makes the fabric extra soft & silky. Flexible
                                ribbed crew neck. Precisely stitched with no pilling & no fading.
                                Provides all-time comfort and style.
                            </p>

                            {/* Table */}
                            <div className="rounded-xl border border-gray-300 overflow-hidden bg-gray-50">
                                <div className="grid grid-cols-3 divide-x divide-gray-200">
                                    <div className="p-4 text-center">
                                        <p className="text-gray-500">Fabric</p>
                                        <p className="font-semibold text-gray-800">Bio-washed Cotton</p>
                                    </div>
                                    <div className="p-4 text-center">
                                        <p className="text-gray-500">Pattern</p>
                                        <p className="font-semibold text-gray-800">Printed</p>
                                    </div>
                                    <div className="p-4 text-center">
                                        <p className="text-gray-500">Fit</p>
                                        <p className="font-semibold text-gray-800">Regular-fit</p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 grid grid-cols-3 divide-x divide-gray-200">
                                    <div className="p-4 text-center">
                                        <p className="text-gray-500">Neck</p>
                                        <p className="font-semibold text-gray-800">Round Neck</p>
                                    </div>
                                    <div className="p-4 text-center">
                                        <p className="text-gray-500">Sleeve</p>
                                        <p className="font-semibold text-gray-800">Half-sleeves</p>
                                    </div>
                                    <div className="p-4 text-center">
                                        <p className="text-gray-500">Style</p>
                                        <p className="font-semibold text-gray-800">Casual Wear</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reviews tab*/}
                <TabsContent value="reviews">
                    <Card className="shadow-none border-none">
                        <CardHeader className="px-0">
                            <CardTitle className="mt-2 mb-1">Customer Reviews</CardTitle>
                            <CardDescription className="mb-3">
                                See what our customers are saying about this product.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-0">
                            <div className="border rounded-md p-4 bg-white">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-semibold text-gray-800">Jane Doe</p>
                                    <span className="text-xs text-yellow-500 font-medium">★★★★☆</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Loved the quality and fit! Perfect for summer outings. Will purchase again.
                                </p>
                            </div>

                            <div className="border rounded-md p-4 bg-white">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-semibold text-gray-800">Sarah Smith</p>
                                    <span className="text-xs text-yellow-500 font-medium">★★★★★</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Fabric is super comfy, looks just like the picture. I recommend it!
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Q&A Tab */}
                <TabsContent value="qa">
                    <Card className="shadow-none border-none">
                        <CardHeader className="px-0">
                            <CardTitle className="mt-2 mb-1">Question & Answer</CardTitle>
                            <CardDescription className="mb-3">
                                Find answers to frequently asked questions about the product.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition cursor-pointer">
                                <p className="flex items-center font-semibold text-gray-800">
                                    <svg
                                        className="w-5 h-5 mr-2 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
                                        />
                                    </svg>
                                    Q: Is the fabric stretchable?
                                </p>
                                <p className="ml-7 mt-1 text-gray-700">
                                    A: No, the fabric is not stretchable but fits comfortably.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition cursor-pointer">
                                <p className="flex items-center font-semibold text-gray-800">
                                    <svg
                                        className="w-5 h-5 mr-2 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
                                        />
                                    </svg>
                                    Q: Is this top machine washable?
                                </p>
                                <p className="ml-7 mt-1 text-gray-700">
                                    A: Yes, it is safe for machine wash on a gentle cycle.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
