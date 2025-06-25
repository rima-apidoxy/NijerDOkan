import Image from "next/image"
import { Trash2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function CartTable() {
    return (
        <div className=" px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Cart Table */}
            <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-6">Your Cart</h2>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 border rounded">
                                        <Image
                                            src="https://static.cilory.com/676880-thickbox_default/abstract-floral-printed-rayon-button-down-summer-shirt-by-estonished.jpg.webp"
                                            alt="product"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium"> Foral Top </p>
                                        <p className="text-xs text-gray-500">Color: White</p>
                                        <p className="text-xs text-gray-500">Size: Regular</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">70.00৳</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline">-</Button>
                                    <span>1</span>
                                    <Button size="sm" variant="outline">+</Button>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">70.00৳</TableCell>
                            <TableCell className="text-center">
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                            <TableCell className="text-right text-blue-600 font-bold">70.00৳</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableFooter>
                </Table>

                <div className="mt-6 flex gap-4">
                    <Button variant="outline">← Continue Shopping</Button>
                    <Button variant="destructive">Update Cart</Button>
                </div>
            </div>

            {/* Cart Summary */}
            <div className="border rounded-lg p-6 shadow-md bg-gray-50">
                <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Cart Totals</h3>

                <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium text-gray-900">70.00৳</span>
                </div>

                <div className="bg-white border rounded-lg p-4 mb-4">
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

                    <p className="text-xs mt-3 text-gray-600">
                        Shipping to <strong>Dhaka</strong>.{" "}
                        <button className="text-blue-600 underline text-xs">Change address</button>
                    </p>
                </div>

                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>130.00৳</span>
                </div>

                <Button className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white text-sm py-3 rounded-lg shadow-sm transition">
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    )
}
