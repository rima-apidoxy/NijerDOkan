import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SectionTitle from "../sectionTitle/sectionTitle"

export function BestDealCards({ title }) {  
    return (
        <div className="w-11/12 md:w-10/12 mx-auto my-8">
            <SectionTitle title={title} />

            {/* Card Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, index) => (
                    <Card key={index} className="w-full max-w-sm shadow-md hover:shadow-lg transition">
                        <CardHeader className="bg-gray-100 px-8 rounded-t-lg relative">
                            {/* 20% OFF Badge */}
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 py-4 rounded-bl-lg rounded-tr-lg z-10">
                                20% OFF
                            </div>

                            <div className="flex justify-center">
                                <Image
                                    src="/images/mobile-1.png"
                                    alt="One Plus Mobile"
                                    width={120}
                                    height={120}
                                    className="rounded-lg"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-lg font-semibold mb-2">One Plus</CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-black font-bold text-md">TK. 10000</span>
                                <span className="line-through text-gray-400 text-sm">TK. 20000</span>
                            </div>
                            <p className="text-green-600 text-md pt-2 font-medium border-t">Save - TK. 10000</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
