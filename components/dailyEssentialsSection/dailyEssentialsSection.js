import React from 'react'
import SectionTitle from '../sectionTitle/sectionTitle'
import Image from 'next/image'

export default function DailyEssentialsSection({ title }) {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto mb-32'>
            <SectionTitle title={title}></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="relative bg-gray-50 p-6 shadow-lg rounded-md flex items-center justify-center w-[160px] h-[160px] border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all  duration-300">
                            <Image
                                src="/images/daily-essentials-img.png"
                                alt="Mobile"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>

                        <h5 className=" text-center font-light mt-6">Daily Essentials</h5>
                        <p className="text-lg font-semibold">UP to 50% OFF</p>

                    </div>
                ))}
            </div>
        </div>
    )
}
