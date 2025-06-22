import React from 'react'
import Image from 'next/image'
import SectionTitle from '../sectionTitle/sectionTitle'

export default function TopCategories({ title }) {
    return (
        <div className="w-11/12 md:w-10/12 mx-auto my-32">
            <SectionTitle title={title} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex flex-col items-center gap-4">
                        <div className="relative bg-gray-50 p-6 shadow-lg rounded-full flex items-center justify-center w-[160px] h-[160px] border-2 border-transparent hover:border-blue-500 transition-all duration-300">
                            <Image
                                src="/images/mobile-2.webp"
                                alt="Mobile"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>

                        <h2 className="text-lg font-semibold text-center">Mobile</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
