"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch cart");
            setCart(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, cartItemId, action) => {
        console.log(cartItemId, action)
        const accessToken = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/item/${productId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItemId, quantity: 1, action }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update cart");
            await fetchCart(); // refresh cart
        } catch (err) {
            alert(err.message);
        }
    };

    const removeItem = async (productId, cartItemId) => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/item/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItemId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to remove item");
            await fetchCart(); // refresh cart
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-red-600 font-medium">Error: {error}</p>
                    <Button onClick={fetchCart} className="mt-4" variant="outline">
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
                    <Button onClick={() => window.history.back()}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    const finalTotal = cart.totals.grandTotal;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-600 mt-2">{cart.itemCount} items in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cart Items</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="pl-6">Product</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Subtotal</TableHead>
                                            <TableHead className="text-center pr-6">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cart.items.map((item, index) => (
                                            <TableRow key={`${item.productId}-${item.variantId}-${index}`} className="border-b">
                                                <TableCell className="pl-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border">
                                                            {item.image ? (
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/image/${cart.shop}/${item.image}`}
                                                                    alt={item.productTitle}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <ShoppingCart className="w-8 h-8 text-gray-300" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900">{item.productTitle}</h3>
                                                            {item.name && item.option && (
                                                                <div className="mt-1">
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        {item.name}: {item.option}
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                            {/* <div className="mt-2 text-xs text-gray-500">
                                                                Stock: {item.stock > 0 ? (
                                                                    <span className="text-green-600">{item.stock} available</span>
                                                                ) : (
                                                                    <span className="text-red-600">Out of stock</span>
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        ৳{item.price ? item.price.toLocaleString() : Math.round(item.subtotal / item.quantity).toLocaleString()}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => updateQuantity(item.productId, item.id, '-')}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </Button>
                                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => updateQuantity(item.productId, item.id, '+')}
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-semibold">৳{item.subtotal.toLocaleString()}</div>
                                                </TableCell>
                                                <TableCell className="text-center pr-6">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-red-50"
                                                        onClick={() => removeItem(item.productId, item.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <div className="mt-6 flex gap-4">
                            <Button variant="outline" onClick={() => window.history.back()}>
                                ← Continue Shopping
                            </Button>
                            <Button variant="secondary" onClick={fetchCart}>
                                Update Cart
                            </Button>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    Cart Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Order Summary */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
                                        <span className="font-medium">৳{cart.totals.subtotal.toLocaleString()}</span>
                                    </div>

                                    {cart.totals.discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Discount</span>
                                            <span className="font-medium text-green-600">-৳{cart.totals.discount.toLocaleString()}</span>
                                        </div>
                                    )}

                                    {cart.totals.tax > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-medium">৳{cart.totals.tax.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>




                                {/* Final Total */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-blue-600">৳{finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                                    Proceed to Checkout
                                </Button>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}