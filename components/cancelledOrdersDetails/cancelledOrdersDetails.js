"use client"

import Image from "next/image"

export default function CancelledOrderCard() {
    return (
        <div className="w-11/12  mx-auto py-10">
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6  border border-red-200 shadow-md rounded-xl bg-red-50 border-b">
                    <div>
                        <p className="text-lg font-semibold text-gray-800">
                            Order ID: <span className="text-black">#987654321</span>
                        </p>
                        <p className="text-sm text-gray-600">Order Date: 15 May 2025 | 3:00 PM</p>
                        <p className="text-sm text-gray-600">Delivery Expected: 20 May 2025</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                            Cancelled
                        </span>
                        <p className="text-sm text-gray-700 mt-2">
                            <span className="font-medium">Payment:</span> Cash on delivery
                        </p>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <Image
                        src="/images/cancelled-shirt.jpg"
                        alt="Blue Printed Shirt"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900">Blue Printed Shirt</h3>
                        <p className="text-sm text-gray-600">Color: Navy Blue</p>
                        <p className="text-sm text-gray-600">Qty: 1</p>
                        <p className="text-sm text-gray-600">Total: ৳42.00</p>
                    </div>
                    <button
                        disabled
                        className="bg-gray-300 text-white text-sm font-semibold px-4 py-2 rounded cursor-not-allowed"
                    >
                        Cancelled
                    </button>
                </div>
            </div>
        </div>
    )
}
