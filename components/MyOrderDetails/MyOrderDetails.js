"use client"

import Image from "next/image"
import Link from "next/link"

export default function MyOrderDetails() {
    return (
        <div className="p-10 space-y-8">
            {/* Order Block */}
            <div className="border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b p-4 bg-gray-100 rounded-lg shadow">
                    <div>
                        <p className="font-semibold text-gray-800">
                            Order no: <span className="text-black">#123456789</span>
                        </p>
                        <p className="text-sm text-gray-600">Order Date: 2 June 2025 2:40 PM</p>
                        <p className="text-sm text-gray-600">Estimated Delivery Date: 8 June 2025</p>
                    </div>
                    <div className="text-right mt-4 sm:mt-0">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Order Status:</span>{" "}
                            <span className="text-blue-600">In progress</span>
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Payment Method:</span> Cash on delivery
                        </p>
                    </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/black-shirt.jpg"
                            alt="Black Printed T-shirt"
                            width={60}
                            height={60}
                            className="rounded object-cover w-16 h-16"
                        />
                        <div>
                            <h4 className="font-medium text-gray-900">Black Printed T-shirt</h4>
                            <p className="text-sm text-gray-600">Colour: Pink</p>
                            <p className="text-sm text-gray-600">Qty: 1</p>
                            <p className="text-sm text-gray-600">Total: ৳23.00</p>
                        </div>
                    </div>
                    <Link href="/myAccount/orderDetails" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                        View Detail
                    </Link>
                </div>
            </div>

            {/* Order Block */}
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b p-4 bg-gray-100 rounded-lg shadow">
                    <div>
                        <p className="font-semibold text-gray-800">
                            Order no: <span className="text-black">#123456789</span>
                        </p>
                        <p className="text-sm text-gray-600">Order Date: 2 June 2025 2:40 PM</p>
                        <p className="text-sm text-gray-600">Estimated Delivery Date: 8 June 2025</p>
                    </div>
                    <div className="text-right mt-4 sm:mt-0">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Order Status:</span>{" "}
                            <span className="text-green-600">Shipped</span>
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Payment Method:</span> Cash on delivery
                        </p>
                    </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/white-coat.jpg"
                            alt="Printed blue & white Coat"
                            width={60}
                            height={60}
                            className="rounded object-cover w-16 h-16"
                        />
                        <div>
                            <h4 className="font-medium text-gray-900">Printed blue & white Coat</h4>
                            <p className="text-sm text-gray-600">Colour: White</p>
                            <p className="text-sm text-gray-600">Qty: 1</p>
                            <p className="text-sm text-gray-600">Total: ৳143.00</p>
                        </div>
                    </div>
                    <Link href="/myAccount/orderDetails" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}