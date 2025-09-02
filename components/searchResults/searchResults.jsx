"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?q=${encodeURIComponent(query)}&limit=20`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-vendor-identifier": "cmefk8met0003609worbmn4v0",
                    },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch products");
                setProducts(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [query]);

    if (!query) return <p className="p-4">Please enter a search term.</p>;

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-6">
            <h2 className="text-xl font-semibold mb-4">Search results for "{query}"</h2>
            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="border p-2 rounded hover:shadow-md">
                            <img src={product.thumbnail || "/images/black-shirt.jpg"} alt={product.title} className="w-full h-40 object-cover rounded" />
                            <h4 className="text-sm font-medium mt-2">{product.title}</h4>
                            <p className="text-sm font-semibold">৳{product.price?.base}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
