import { Star } from "lucide-react"
import Image from "next/image"

const similarProducts = [
    {
        id: "p1",
        title: "Floral Print Midi Dress",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-5rDZibk9dXD2bvgTVZS_ozJEweNlgN5AQ&s",
        price: 59.99,
        rating: 4.2,
    },
    {
        id: "p2",
        title: "Casual Linen Top",
        image: "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/o/23/e040b2e2-4020-4faa-8bcb-5a5ae52b6815.jpg",
        price: 39.99,
        rating: 4.7,
    },
    {
        id: "p3",
        title: "Casual floral Top",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFZ20DzPXrcaDCL-OiOtsAuBbxX4YT7wquJsf76gd6_pduG_O9BVnTu3KrbRWGHlzoG4&usqp=CAU",
        price: 69.99,
        rating: 4.5,
    },

]

export function SimilarProductsSection() {
    return (
        <section className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {similarProducts.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="relative w-full h-48 mb-4">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.title}</h3>
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{product.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-lg font-bold text-blue-700">${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
