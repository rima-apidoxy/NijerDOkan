"use client";

import { Heart } from "lucide-react";

export default function Wishlist() {
    const wishlist = [
        {
            id: 1,
            title: "Wireless Headphones",
            image: "/images/headphone.jpg",
            price: "$99",
            rating: 4.5,
        },
        {
            id: 2,
            title: "Smart Watch",
            image: "/images/watch.jpg",
            price: "$199",
            rating: 4.2,
        },
        {
            id: 3,
            title: "Bluetooth Speaker",
            image: "/images/speaker.jpg",
            price: "$49",
            rating: 4.8,
        },
        {
            id: 4,
            title: "Digital Camera",
            image: "/images/camera.jpg",
            price: "$399",
            rating: 4.6,
        },
    ];

    return (
        <div className="w-11/12 md:w-10/12 mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold  text-center text-blue-700 mb-12">
                ❤️ My Wishlist
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {wishlist.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden relative"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />

                            <button className="absolute top-2 right-2 bg-white/70 rounded-full p-1 hover:bg-white">
                                <Heart className="w-5 h-5 text-blue-600" />
                            </button>

                            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                15% OFF
                            </span>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-800 truncate">
                                    {item.title}
                                </h2>
                                <p className="text-blue-600 font-bold mt-1">{item.price}</p>

                                <div className="flex items-center mt-1">
                                    <div className="flex">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 fill-current ${i < Math.floor(item.rating)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09L5.8 12.545.924 8.41l6.122-.891L10 2.5l2.954 5.018 6.122.891-4.876 4.135 1.678 5.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-1 text-xs text-gray-500">
                                        {item.rating}
                                    </span>
                                </div>
                            </div>

                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-full transition-colors duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
