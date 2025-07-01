"use client"

import React from 'react'
import SectionTitle from '../sectionTitle/sectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'
import Image from 'next/image'

export default function TopBrandsSection({ title }) {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto mb-32'>
            <SectionTitle title={title} />

            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
                spaceBetween={30}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
            >
                {[
                    { name: 'OnePlus', bg: 'bg-blue-100', text: 'text-blue-800', alt: 'OnePlus' },
                    { name: 'Samsung', bg: 'bg-pink-100', text: 'text-pink-800', alt: 'Samsung' },
                    { name: 'iPhone', bg: 'bg-green-100', text: 'text-green-800', alt: 'iPhone' },
                    { name: 'Realme', bg: 'bg-yellow-100', text: 'text-yellow-800', alt: 'Realme' },
                    { name: 'Vivo', bg: 'bg-purple-100', text: 'text-purple-800', alt: 'Vivo' },
                    { name: 'Oppo', bg: 'bg-red-100', text: 'text-red-800', alt: 'Oppo' },
                ].map(({ name, bg, text, alt }, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className={`${bg} rounded-lg flex items-center px-4 py-6 relative min-h-[120px]`}
                        >
                            <div>
                                <p className="text-sm text-gray-600">Top Brand</p>
                                <h3 className={`text-lg font-bold ${text}`}>{name}</h3>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Image
                                    src="/images/mobile-1.png"
                                    alt={alt}
                                    width={90}
                                    height={90}
                                    className="rounded-lg"
                                    sizes="(max-width: 640px) 70px, 90px"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
