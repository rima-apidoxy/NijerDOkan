"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"

const cartItems = [
    {
        id: 1,
        name: "Floral Summer Top",
        price: 49.99,
        quantity: 1,
        image: "/images/floral-top.jpg",
    },
    {
        id: 2,
        name: "Denim Jeans",
        price: 69.99,
        quantity: 2,
        image: "/images/denim-jeans.jpg",
    },
]

export default function CheckoutDetail() {
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    return (
        <div className="w-11/12 md:w-10/12 mx-auto py-12 grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">

            {/* Billing Details */}
            <div className=" p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                <form className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <Input placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <Input placeholder="John Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Country/Region
                        </label>
                        <Input placeholder="Bangladesh" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Street address
                        </label>
                        <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">District

                        </label>
                        <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Postcode/ZIP (optional)


                        </label>
                        <Input type="email" placeholder="john@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <Input placeholder="+880123456789" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Order notes(optional)</label>
                        <Textarea className="h-28" placeholder="Notes about your order" />
                    </div>

                </form>
            </div>

            {/* Your Order */}
            <div className="border-2 border-rose-700 p-7 rounded-md shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Order</h2>
                <div className="flex items-center justify-between text-gray-500 font-bold border-b pb-1 mb-2">
                    <h3>PRODUCT</h3>
                    <h3>SUBTOTAL</h3>
                </div>
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 items-center border-b pb-4"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className=" object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                    ৳{item.price.toFixed(2)} × {item.quantity}
                                </p>
                            </div>
                            <p className="font-semibold text-gray-800">
                                ৳{(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                    <div className="border-b pb-2 text-lg font-semibold flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{total.toFixed(2)}</span>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold text-sm text-gray-800 mb-3">Shipping Options</p>
                        <RadioGroup defaultValue="dhaka" className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="dhaka" id="dhaka" />
                                    <label htmlFor="dhaka" className="text-sm text-gray-700">Dhaka</label>
                                </div>
                                <span className="text-sm font-medium text-gray-800">60.00৳</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="outside" id="outside" />
                                    <label htmlFor="outside" className="text-sm text-gray-700">Out Side Dhaka</label>
                                </div>
                                <span className="text-sm font-medium text-gray-800">100.00৳</span>
                            </div>
                        </RadioGroup>

                    </div>
                    <div className=" border-t border-b-2 pb-2 text-lg font-semibold flex justify-between">
                        <span>Total</span>
                        <span>৳{total.toFixed(2)}</span>
                    </div>
                    <RadioGroup defaultValue="cash-on-delivery" className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                                <label htmlFor="cash-on-delivery" className="font-bold">
                                    Cash on Delivery
                                </label>
                            </div>
                            <span className="text-sm font-medium text-gray-800">60.00৳</span>
                        </div>
                    </RadioGroup>

                    <div>
                        <p className="text-gray-400 border-b">Pay with cash upon delivery</p>
                    </div>
                    <RadioGroup>
                        <div className="">
                            <div className="flex items-center">
                                <RadioGroupItem value="cash-on-delivery" id="Cash-on -delivery" />
                                <label htmlFor="Cash on Delivery" className="font-bold">bKash Payment Gateway</label>
                                <Image
                                    src="/images/bkash-logo.png"
                                    alt="bkash logo"
                                    width={100}
                                    height={100}
                                    className="object-cover rounded"
                                />
                            </div>
                        </div>
                    </RadioGroup>

                </div>

                <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 mt-4">
                    Place Order
                </Button>

                <p className="text-sm text-gray-500 my-2">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <strong>privacy policy</strong>.
                </p>
            </div>
        </div>
    )
}
