"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"

export default function CheckoutDetail() {
    const [cart, setCart] = useState(null)
    const [loadingCart, setLoadingCart] = useState(true)
    const [deliveryCharge, setDeliveryCharge] = useState(0)
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Bangladesh",
        paymentMethod: "cod",
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    // 🔹 Fetch cart from API
    useEffect(() => {
        const fetchCart = async () => {
            const accessToken = localStorage.getItem("accessToken");
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "x-vendor-identifier": "cmefk8met0003609worbmn4v0",
                    },
                });
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || "Failed to load cart")
                setCart(data.data)
            } catch (err) {
                console.error("Cart fetch error:", err)
            } finally {
                setLoadingCart(false)
            }
        }
        fetchCart()
    }, [])

    useEffect(() => {
        const fetchDeliveryCharge = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/settings/delivery-charge`, {
                    method: "GET",
                    headers: {
                        "x-vendor-identifier": "cmefk8met0003609worbmn4v0",
                    },
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || "Failed to load delivery charge")

                setDeliveryOptions(data.deliveryCharges || [])

                // ✅ Set default delivery charge and ID
                const defaultOption = data.deliveryCharges?.find(d => d.isDefault)
                setDeliveryCharge(defaultOption?.charge || 0)
                setSelectedDeliveryOptionId(defaultOption?._id || null)
            } catch (err) {
                console.error("Delivery charge fetch error:", err)
            }
        }
        fetchDeliveryCharge()
    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const accessToken = localStorage.getItem("accessToken");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "x-vendor-identifier": "cmefk8met0003609worbmn4v0",
                },
                body: JSON.stringify({
                    shippingAddress: {
                        name: formData.name,
                        phone: formData.phone,
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.postalCode,
                        country: formData.country,
                    },
                    paymentMethod: formData.paymentMethod,
                    deliveryOptionId: selectedDeliveryOptionId

                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to place order");

            setMessage("✅ Order placed successfully!");
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    if (loadingCart) {
        return <p className="text-center py-10">Loading cart...</p>
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return <p className="text-center py-10">Your cart is empty.</p>
    }

    const subtotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0)
    const total = subtotal + deliveryCharge

    return (
        <div className="w-11/12 md:w-10/12 mx-auto py-12 grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
            {/* Billing Details */}
            <div className="p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+880123456789"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Country</label>
                        <Input
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Bangladesh"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Street</label>
                        <Input
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="House 12, Road 5"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">City/District</label>
                        <Input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Dhaka"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Postal Code</label>
                        <Input
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="1205"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Order notes (optional)
                        </label>
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
                    {cart.items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex gap-4 items-center border-b pb-4"
                        >
                            <Image
                                src={item.image || "/images/placeholder.png"}
                                alt={item.productTitle}
                                width={64}
                                height={64}
                                className="object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{item.productTitle}</p>
                                <p className="text-sm text-gray-600">
                                    ৳{(item.subtotal / item.quantity).toFixed(2)} × {item.quantity}
                                </p>
                            </div>
                            <p className="font-semibold text-gray-800">৳{item.subtotal.toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="border-b pb-2 text-lg font-semibold flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="border-b pb-2">
                        <p className="text-lg font-semibold mb-2">Delivery Charge</p>
                        <RadioGroup
                            value={selectedDeliveryOptionId} // 🔹 Changed
                            onValueChange={(val) => {
                                const selected = deliveryOptions.find((d) => d._id === val)
                                setDeliveryCharge(selected?.charge || 0)
                                setSelectedDeliveryOptionId(val) // 🔹 Changed
                            }}
                            className="space-y-2"
                        >
                            {deliveryOptions.map((option) => (
                                <div key={option._id} className="flex items-center gap-2">
                                    <RadioGroupItem value={option._id} id={option._id} />
                                    <label htmlFor={option._id} className="font-medium">
                                        {option.isDefault
                                            ? `Default - ৳${option.charge}`
                                            : `${option.regionName} (${option.chargeBasedOn}) - ৳${option.charge}`}
                                    </label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="text-lg font-bold flex justify-between">
                        <span>Total</span>
                        <span>৳{total.toFixed(2)}</span>
                    </div>

                    {/* Payment Options */}
                    <RadioGroup
                        defaultValue="cod"
                        className="space-y-2"
                        onValueChange={(val) =>
                            setFormData({ ...formData, paymentMethod: val })
                        }
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="cod" id="cod" />
                                <label htmlFor="cod" className="font-bold">
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>
                    </RadioGroup>

                    <Button
                        type="button"
                        className="w-full bg-blue-700 hover:bg-blue-800 mt-4"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </Button>

                    {message && (
                        <p className="text-sm mt-2 text-center text-red-500">{message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
