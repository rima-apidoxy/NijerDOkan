"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
    ShoppingCart,
    CreditCard,
    Truck,
    MapPin,
    Phone,
    User,
    Mail,
    CheckCircle,
    AlertCircle,
    Loader2
} from "lucide-react"

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
    const [messageType, setMessageType] = useState("")

    // 🔹 Fetch cart from API
    useEffect(() => {
        const fetchCart = async () => {
            const accessToken = localStorage.getItem("accessToken");
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || "Failed to load cart")
                setCart(data.data)
            } catch (err) {
                console.error("Cart fetch error:", err)
                setMessage("Failed to load cart")
                setMessageType("error")
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


    console.log(deliveryOptions)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cart || !cart.items.length) {
            setMessage("Your cart is empty.");
            setMessageType("error");
            return;
        }
        if (!selectedDeliveryOptionId) {
            setMessage("Please select a delivery option.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");
        setMessageType("");

        const accessToken = localStorage.getItem("accessToken");

        // Calculate subtotal and grand total
        const subtotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
        const grandTotal = subtotal + deliveryCharge;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    shop: cart.shop,
                    items: cart.items.map(item => ({
                        cartItemId: item.id,
                        productId: item.productId,
                        variantId: item.variantId || null,
                        option: item.option || null,
                        name: item.name,
                        quantity: item.quantity,
                        price: { basePrice: item.price, currency: "BDT" },
                        total: item.subtotal,
                        // image: item.image || null,
                        // added_at: item.added_at ? new Date(item.added_at) : new Date(),
                    })),
                    totals: {
                        subtotal,
                        discount: 0,
                        tax: 0,
                        deliveryCharge,
                        grandTotal,
                    },
                    shippingAddress: {
                        name: formData.name,
                        phone: formData.phone,
                        orderNote: formData.orderNote || "",
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.postalCode,
                        country: formData.country,
                    },
                    paymentMethod: formData.paymentMethod,
                    deliveryOptionId: selectedDeliveryOptionId,

                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to place order");

            setMessage("Order placed successfully!");
            setMessageType("success");

            // Optional: clear cart locally
            setCart({ ...cart, items: [], totals: { subtotal: 0, discount: 0, tax: 0, deliveryCharge: 0, grandTotal: 0 } });
        } catch (err) {
            setMessage(err.message);
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };


    if (loadingCart) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Loading your cart...</p>
                </div>
            </div>
        )
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Your cart is empty</p>
                    <p className="text-gray-500 mt-2">Add some products to continue</p>
                </div>
            </div>
        )
    }

    const subtotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0)
    const total = subtotal + deliveryCharge

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 max-w-7xl mx-auto">
                    {/* Billing Details */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Billing Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <User className="h-4 w-4 text-blue-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Full Name *
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter your full name"
                                                    className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                                Phone Number *
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+880123456789"
                                                    className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Shipping Address */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        Shipping Address
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                                            Country *
                                        </Label>
                                        <Input
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="street" className="text-sm font-medium text-gray-700">
                                            Street Address *
                                        </Label>
                                        <Input
                                            id="street"
                                            name="street"
                                            value={formData.street}
                                            onChange={handleChange}
                                            placeholder="House 12, Road 5, Block A"
                                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                                City/District *
                                            </Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Dhaka"
                                                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                                                State/Division
                                            </Label>
                                            <Input
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder="Dhaka Division"
                                                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                                                Postal Code *
                                            </Label>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                placeholder="1205"
                                                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Order Notes */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                                        Order Notes (Optional)
                                    </Label>
                                    <Textarea
                                        id="orderNote"
                                        name="orderNote"
                                        value={formData.orderNote || ""}
                                        onChange={handleChange}
                                        placeholder="Any special instructions for your order..."
                                        className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card className="shadow-lg border-0 sticky top-4">
                            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Your Order
                                    <Badge variant="secondary" className="ml-auto bg-white text-green-700">
                                        {cart.items.length} item{cart.items.length > 1 ? 's' : ''}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {/* Order Items */}
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {cart.items.map((item) => (
                                        <div key={item.productId} className="flex gap-4 items-start">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-gray-50 flex-shrink-0">
                                                {item.image ? (
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${cart.shop}/${item.image}`}
                                                        alt={item.productTitle}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ShoppingCart className="w-6 h-6 text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-900 truncate">
                                                    {item.productTitle}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    ৳{(item.subtotal / item.quantity).toFixed(2)} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                ৳{item.subtotal.toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                {/* Pricing */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                                    </div>

                                    {/* Delivery Options */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                            <Truck className="h-4 w-4 text-blue-600" />
                                            Delivery Options
                                        </Label>
                                        <RadioGroup
                                            value={selectedDeliveryOptionId}
                                            onValueChange={(val) => {
                                                const selected = deliveryOptions.find((d) => d._id === val)
                                                setDeliveryCharge(selected?.charge || 0)
                                                setSelectedDeliveryOptionId(val)
                                            }}
                                            className="space-y-2"
                                        >
                                            {deliveryOptions.map((option) => (
                                                <div key={option._id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <RadioGroupItem value={option._id} id={option._id} />
                                                    <Label htmlFor={option._id} className="flex-1 text-xs cursor-pointer">
                                                        {option.isDefault
                                                            ? `Standard Delivery - ৳${option.charge}`
                                                            : `${option.regionName} (${option.chargeBasedOn}) - ৳${option.charge}`}
                                                        {option.isDefault && (
                                                            <Badge variant="outline" className="ml-2 text-xs">Default</Badge>
                                                        )}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery</span>
                                        <span className="font-medium">৳{deliveryCharge.toFixed(2)}</span>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-green-600">৳{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Payment Method */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <CreditCard className="h-4 w-4 text-blue-600" />
                                        Payment Method
                                    </Label>
                                    <RadioGroup
                                        defaultValue="cod"
                                        onValueChange={(val) =>
                                            setFormData({ ...formData, paymentMethod: val })
                                        }
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <RadioGroupItem value="cod" id="cod" />
                                            <Label htmlFor="cod" className="flex-1 cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">Cash on Delivery</span>
                                                    <Badge variant="secondary">COD</Badge>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Pay when you receive your order
                                                </p>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Place Order Button */}
                                <Button
                                    type="button"
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-6"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Place Order
                                        </div>
                                    )}
                                </Button>

                                {/* Message Display */}
                                {message && (
                                    <div className={`flex items-center gap-2 p-3 rounded-lg mt-4 ${messageType === "success"
                                        ? "bg-green-50 text-green-800 border border-green-200"
                                        : "bg-red-50 text-red-800 border border-red-200"
                                        }`}>
                                        {messageType === "success" ? (
                                            <CheckCircle className="h-4 w-4" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4" />
                                        )}
                                        <p className="text-sm font-medium">{message}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}