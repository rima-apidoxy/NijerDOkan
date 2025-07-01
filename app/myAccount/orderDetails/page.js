import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function OrderDetails() {
    const order = {
        id: "#123456789",
        placedOn: "2 June 2025 2:40 PM",
        verifiedOn: "8 June 2025 3:40 PM",
        total: "৳143.00",
        status: "Inprogress",
        steps: ["Order Placed", "Inprogress", "Shipped", "Delivered"],
        products: [
            {
                name: "Printed white cote",
                color: "White",
                qty: 1,
                price: 29,
                image: "/images/jacket.png",
            },
            {
                name: "Men Blue Shirt",
                color: "Blue",
                qty: 1,
                price: 29,
                image: "/images/shirt.png",
            },
        ],
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            {/* Order */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                    <p className="font-semibold">Order no: {order.id}</p>
                    <p className="text-sm text-gray-600">Placed On {order.placedOn}</p>
                </div>
                <p className="font-semibold">Total: <span className="text-gray-800">{order.total}</span></p>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col items-center">
                <div className="flex justify-between w-full max-w-xl relative">
                    {order.steps.map((step, idx) => (
                        <div key={step} className="flex flex-col items-center w-1/4">
                            <div
                                className={`w-5 h-5 rounded-full z-10 ${step === order.status ? "bg-black" : "bg-gray-300"
                                    }`}
                            />
                            <p className={`text-xs mt-2 ${step === order.status ? "text-black" : "text-gray-400"}`}>
                                {step}
                            </p>
                        </div>
                    ))}
                    <div className="absolute top-2 w-full h-0.5 bg-gray-300 z-0" />
                </div>
            </div>

            {/* Status Message */}
            <div className="bg-gray-100 border rounded px-4 py-3">
                <p className="text-sm text-gray-700">
                    <span className="font-medium">{order.verifiedOn}</span> — Your order has been successfully verified.
                </p>
            </div>

            {/* Product List */}
            <div className="space-y-6">
                {order.products.map((product, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 border-b pb-4"
                    >
                        <div className="w-20 h-20 relative rounded overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-600">Color: {product.color}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p>Qty: {product.qty}</p>
                            <p className="font-semibold">৳{product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
