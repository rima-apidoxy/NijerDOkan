"use client"

import Image from "next/image"

export default function CompletedOrdersDetails() {
    return (
        <div className="w-11/12 max-w-4xl mx-auto py-10">
            <div className=" ">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center  p-6  border border-green-200  bg-green-50 rounded-xl shadow-sm overflow-hidden">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Order Completed: <span className="text-black">#A202506231</span>
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">Ordered on: 18 June 2025</p>
                        <p className="text-sm text-gray-600">Delivered on: 23 June 2025</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Completed
                        </span>
                        <p className="text-sm text-gray-700 mt-2">
                            <span className="font-medium">Payment:</span> Cash on Delivery
                        </p>
                    </div>
                </div>

                {/* Product */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 p-6">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/completed-shirt.jpg"
                            alt="Green Linen Shirt"
                            width={72}
                            height={72}
                            className="rounded-md object-cover border w-20 h-20"
                        />
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">Green Linen Shirt</h3>
                            <p className="text-sm text-gray-600">Color: Olive Green</p>
                            <p className="text-sm text-gray-600">Qty: 1</p>
                            <p className="text-sm text-gray-600">Total: ৳1,250.00</p>
                        </div>
                    </div>

                    <button className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition">
                        Reorder
                    </button>
                </div>
            </div>
        </div>
    )
}
