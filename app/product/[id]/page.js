import Image from "next/image"
import { Star, ChevronRight, ShieldCheck, Ruler, Truck, Repeat } from "lucide-react"
import { ProductDetailsTabs } from "@/components/productDetailsTabs/productDetailsTabs"
import { SimilarProductsSection } from "@/components/similarProductsSection/similarProductSections"

export default function ProductDetailPage({ params }) {
    const product = {
        id: params.id,
        title: "Women's Floral Summer Top",
        description:
            "This floral top is made from lightweight, breathable fabric and features a relaxed fit for all-day comfort. Perfect for warm weather.",
        image: "https://static.cilory.com/676880-thickbox_default/abstract-floral-printed-rayon-button-down-summer-shirt-by-estonished.jpg.webp",
        price: 49.99,
        category: "Women's Wear",
        subcategory: "Tops",
        brand: "StyleBloom",
        inStock: true,
        rating: 4.5,
        reviews: 37,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["#f87171", "#60a5fa", "#34d399"],
    }

    return (
        <div className="w-11/12 md:w-10/12 mx-auto py-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="rounded-lg shadow-md w-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <div className="mb-6">
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <span className="hover:text-blue-600 cursor-pointer">Clothing</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="hover:text-blue-600 cursor-pointer">{product.category}</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-gray-800 font-medium">{product.subcategory}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.title}</h1>

                    {/* Rating */}
                    <div className="flex items-center text-sm text-yellow-500 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "" : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-gray-600 ml-2">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    {/* Size selection */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-sm font-semibold text-gray-700">Select Size</h4>
                            <button className="text-xs text-blue-600 hover:underline">Size Guide</button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className="px-3 py-1 border border-gray-300 rounded hover:bg-blue-100 text-sm"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color selection */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Available Colors</h4>
                        <div className="flex gap-3">
                            {product.colors.map((color, i) => (
                                <span
                                    key={i}
                                    className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                                    style={{ backgroundColor: color }}
                                ></span>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                        <p className="text-sm font-medium">
                            Status:{" "}
                            <span className={`font-semibold ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>
                    </div>

                    {/* Price and Add to Cart */}
                    <div>
                        <div className="flex items-center mt-6 flex-wrap gap-4">
                            <button
                                disabled={!product.inStock}
                                className={`px-6 py-3 rounded-md text-white font-semibold transition duration-300 ${product.inStock ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </button>
                            <div className="text-2xl font-bold text-blue-700 border border-blue-600 px-4 py-2 rounded-md">
                                ${product.price.toFixed(2)}
                            </div>
                        </div>

                        <div className="border-t border-gray-300 mt-6 mb-6"></div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-gray-700 text-base font-medium mt-6">
                            <div className="flex items-center gap-3 ">
                                <div className="bg-gray-100 rounded-full p-4">
                                    <ShieldCheck className="w-6 h-6 " />
                                </div>
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 rounded-full p-4">
                                    <Ruler className="w-6 h-6 " />
                                </div>
                                <span>Size & Fit</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 rounded-full p-4">
                                    <Truck className="w-6 h-6 " />
                                </div>
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 rounded-full p-4">
                                    <Repeat className="w-6 h-6 " />
                                </div>
                                <span>Free Shipping & Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <div className="flex flex-col h-full">
                        <h2 className="text-4xl font-extrabold text-black border-l-4 border-l-blue-600 pl-4 mb-6">
                            Product Description
                        </h2>
                        <div className="flex-grow">
                            <ProductDetailsTabs />
                        </div>
                    </div>

                    {/*Product Video */}
                    <div className="flex items-center justify-center h-full mt-20">
                        <video
                            src="/videos/product-demo.mp4"
                            controls
                            className="w-full h-auto max-h-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div>
                <SimilarProductsSection></SimilarProductsSection>
            </div>

        </div>
    )
}
