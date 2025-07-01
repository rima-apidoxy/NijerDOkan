"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("/data/categories.json")
            .then((response) => response.json())
            .then((data) => {
                const topCategories = data.collections.filter(item => item.parent === null)
                setCategories(topCategories)
            })
            .catch((error) => {
                console.error("Error fetching categories:", error)
            })
    }, [])

    return (
        <div className="w-11/12 max-w-7xl mx-auto my-10">
            <h1 className="text-2xl font-bold mb-6">Browse Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Card
                        key={cat.id}
                        className="hover:shadow-xl transition-shadow duration-200 rounded-xl"
                    >
                        <CardContent className="p-4 flex flex-col items-center">
                            <Image
                                src={cat.image}
                                alt={cat.title}
                                width={100}
                                height={100}
                                className="mb-3"
                            />
                            <h4 className="text-md font-semibold text-center">{cat.title}</h4>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
