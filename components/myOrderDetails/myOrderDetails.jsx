"use client"

import Image from "next/image"
import Link from "next/link"

export default function MyOrderDetails({ orders, loading }) {

    if (loading) {
        return <p className="p-10 text-center text-gray-500">Loading orders...</p>
    }

    if (!orders.length) {
        return <p className="p-10 text-center text-gray-500">No active orders found.</p>
    }

    return (
        <div className="p-6 space-y-8">
            {orders.map((order) => (
                <div key={order._id} className="border rounded-lg shadow">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b p-4 bg-gray-100 rounded-t-lg">
                        <div>
                            <p className="font-semibold text-gray-800">
                                Order no: <span className="text-black">#{order.orderId}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Order Date: {new Date(order.placedAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                Estimated Delivery Date: {new Date(new Date(order.placedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-right mt-4 sm:mt-0">
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Order Status:</span>{" "}
                                <span className={`${order.orderStatus === 'pending_payment' ? 'text-blue-600' :
                                    order.orderStatus === 'processing' ? 'text-yellow-600' :
                                        order.orderStatus === 'shipped' ? 'text-green-600' : 'text-gray-600'
                                    }`}>
                                    {order.orderStatus.replace('_', ' ')}
                                </span>
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Payment Method:</span>{" "}
                                {order.payment?.method === 'cod' ? 'Cash on delivery' : order.payment?.method}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 space-y-4">
                        {order.items.map((item) => (
                            <div key={item.productId} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 last:border-none last:pb-0">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/images/black-shirt.jpg" // 
                                        alt={item.title}
                                        width={60}
                                        height={60}
                                        className="rounded object-cover w-16 h-16"
                                    />
                                    <div>
                                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Price: ৳{item.price.final}</p>
                                        <p className="text-sm text-gray-600">Total: ৳{item.total}</p>
                                    </div>
                                </div>
                                <Link
                                    href={`/myAccount/orderDetails/${order._id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                                >
                                    View Detail
                                </Link>
                            </div>
                        ))}

                        {/* Order Summary */}
                        <div className="text-right mt-4">
                            <p className="text-sm text-gray-700">
                                Subtotal: ৳{order.totals.subtotal}
                            </p>
                            <p className="text-sm text-gray-700">
                                Delivery Charge: ৳{order.totals.deliveryCharge}
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                                Grand Total: ৳{order.totals.grandTotal}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
