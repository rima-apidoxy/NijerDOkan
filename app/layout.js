import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { BadgePercent, MapPin, Truck } from "lucide-react";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-200 py-4">
          <div className="w-11/12 md:w-10/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <h4 className="text-gray-600">
              Welcome to worldwide NijerDokan!
            </h4>
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Deliver to <span className="font-bold">423651</span></span>
                <span className="hidden md:block h-4 w-px bg-gray-400 mx-2"></span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Track your order</span>
                <span className="hidden md:block h-4 w-px bg-gray-400 mx-2"></span>
              </div>
              <div className="flex items-center gap-1">
                <BadgePercent className="w-4 h-4 text-blue-500" />
                <span>All Offers</span>
              </div>
            </div>
          </div>
        </div>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>

      </body>
    </html>
  );
}
