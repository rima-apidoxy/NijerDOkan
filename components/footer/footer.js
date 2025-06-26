import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { FaWhatsapp } from "react-icons/fa6"
import { MdOutlineWifiCalling3 } from "react-icons/md"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="mt-20 bg-blue-700 text-white">
            <div className="w-11/12 md:w-10/12 mx-auto py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand & Contact */}
                    <div>
                        <h2 className="font-extrabold text-4xl">NijerDokan</h2>
                        <h4 className="text-lg font-semibold mt-6 mb-3">Contact Us</h4>

                        <div className="flex items-start gap-3">
                            <FaWhatsapp className="text-xl mt-1" />
                            <div>
                                <p className="font-medium">WhatsApp</p>
                                <p className="text-sm">+8800000000</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mt-4">
                            <MdOutlineWifiCalling3 className="text-xl mt-1" />
                            <div>
                                <p className="font-medium">Call Us</p>
                                <p className="text-sm">+8800000000</p>
                            </div>
                        </div>

                        <h5 className="font-bold mt-6 mb-2">Download App</h5>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/google-play.webp"
                                alt="Google Play"
                                width={120}
                                height={40}
                                className="rounded-md"
                            />
                            <Image
                                src="/images/Apple-Store.png"
                                alt="Apple Store"
                                width={120}
                                height={40}
                                className="rounded-md"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 border-b-2 border-white inline-block">
                            Most Popular Categories
                        </h4>
                        <ul className="space-y-1 text-sm list-disc list-inside mt-2">
                            <li><Link href="/">Staples</Link></li>
                            <li><Link href="/products">Beverages</Link></li>
                            <li><Link href="/contact">Personal Care</Link></li>
                            <li><Link href="/about">Home Care</Link></li>
                            <li><Link href="/about">Baby Care</Link></li>
                            <li><Link href="/about">Vegetables and Fruits</Link></li>
                            <li><Link href="/about">Snacks and Foods</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 border-b-2 border-white inline-block">
                            Customer Services
                        </h4>
                        <ul className="space-y-1 text-sm list-disc list-inside mt-2">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/return-policy">Cancellation & Return Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-6 bg-white/30" />

                <div className="text-center text-sm">
                    © {new Date().getFullYear()} NijerDokan. All rights reserved.
                </div>
            </div>
        </footer>
    )
}