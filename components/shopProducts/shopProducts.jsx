'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
    const searchParams = useSearchParams();
    const categorySlug = searchParams.get("category");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const queryObj = {
                page,
                limit: "20"
            };

            if (categorySlug) {
                queryObj.category = categorySlug;
            }

            const query = new URLSearchParams(queryObj).toString();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?${query}`);
            const data = await res.json();

            if (data.success) {
                setProducts(data.data);
                setTotalPages(data.pagination.totalPages);
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [categorySlug, page]);

    const handleNextPage = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                {categorySlug ? `Category: ${categorySlug}` : "All Products"}
            </h1>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-2 rounded" />
                            <h2 className="font-semibold">{product.title}</h2>
                            <p className="text-gray-600">{product.price?.currency} {product.price?.base}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
