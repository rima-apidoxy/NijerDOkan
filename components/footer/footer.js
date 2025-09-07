import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
    return (
        <footer className="mt-20 bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="font-bold text-2xl text-gray-900">NijerDokan</h2>
                        <p className="text-sm text-gray-600 mt-1">Your trusted online store</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        {/* <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About Us
                        </Link> */}
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Contact
                        </Link>
                        <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link href="/return-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Returns
                        </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-right">
                        <p className="text-sm text-gray-600">Need help?</p>
                        <p className="text-sm font-medium text-gray-900">+8800000000</p>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Copyright */}
                <div className="text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} NijerDokan. All rights reserved.
                </div>
            </div>
        </footer>
    )
}