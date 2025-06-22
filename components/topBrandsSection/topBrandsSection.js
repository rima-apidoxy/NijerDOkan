"use client"

import React from 'react'
import SectionTitle from '../sectionTitle/sectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'
import Image from 'next/image'

export default function TopBrandsSection({ title }) {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto mb-32'>
            <SectionTitle title={title} />

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative h-32 bg-blue-100 rounded-lg flex items-center px-4">
                        <div>
                            <p className="text-sm text-gray-600">Top Brand</p>
                            <h3 className="text-lg font-bold text-blue-800">OnePlus</h3>
                        </div>
                        <div className="absolute right-4 ">
                            <Image
                                src="/images/mobile-1.png"
                                alt="OnePlus"
                                width={120}
                                height={120}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative h-32 bg-pink-100 rounded-lg flex items-center px-4">
                        <div>
                            <p className="text-sm text-gray-600">Top Brand</p>
                            <h3 className="text-lg font-bold text-pink-800">Samsung</h3>
                        </div>
                        <div className="absolute right-4">
                            <Image
                                src="/images/mobile-1.png"
                                alt="OnePlus"
                                width={120}
                                height={120}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative h-32 bg-green-100 rounded-lg flex items-center px-4">
                        <div>
                            <p className="text-sm text-gray-600">Top Brand</p>
                            <h3 className="text-lg font-bold text-green-800">iPhone</h3>
                        </div>
                        <div className="absolute right-4">
                            <Image
                                src="/images/mobile-1.png"
                                alt="OnePlus"
                                width={120}
                                height={120}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide>
                    <div className="relative h-32 bg-yellow-100 rounded-lg flex items-center px-4">
                        <div>
                            <p className="text-sm text-gray-600">Top Brand</p>
                            <h3 className="text-lg font-bold text-yellow-800">Realme</h3>
                        </div>
                        <div className="absolute right-4">
                            <Image
                                src="/images/mobile-1.png"
                                alt="OnePlus"
                                width={120}
                                height={120}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 5 */}
                <SwiperSlide>
                    <div className="relative h-32 bg-purple-100 rounded-lg flex items-center px-4">
                        <div>
                            <p className="text-sm text-gray-600">Top Brand</p>
                            <h3 className="text-lg font-bold text-purple-800">Vivo</h3>
                        </div>
                        <div className="absolute right-4">
                            <Image
                                src="/images/mobile-1.png"
                                alt="OnePlus"
                                width={120}
                                height={120}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 6 */}
                <SwiperSlide>
                    <div className="relative h-32 bg-red-100 rounded-lg flex items-center px-4">
                        <div>
                            <p className="text-sm text-gray-600">Top Brand</p>
                            <h3 className="text-lg font-bold text-red-800">Oppo</h3>
                        </div>
                        <div className="absolute right-4">
                            <Image
                                src="/images/mobile-1.png"
                                alt="OnePlus"
                                width={120}
                                height={120}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
