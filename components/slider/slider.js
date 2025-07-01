"use client"

import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function Slider() {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-11/12 md:w-10/12 mb-28 rounded-xl overflow-hidden"
        >
            {[1, 2, 3].map((slide) => (
                <SwiperSlide key={slide}>
                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px]">
                        <Image
                            src="/images/bg.jpg"
                            alt="Background"
                            fill
                            className="object-cover"
                        />

                        <Image
                            src="/images/watch.png"
                            alt="Smart Watch"
                            width={220}
                            height={220}
                            className="absolute top-1/2 right-6 sm:right-12 md:right-20 -translate-y-1/2 z-10"
                        />

                        <div
                            className="
                                absolute left-6 sm:left-12 md:left-20 top-1/2 -translate-y-1/2 z-20
                                bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-lg max-w-xs sm:max-w-md
                                md:bg-transparent md:backdrop-blur-none
                            "
                        >
                            <p className="text-xs sm:text-sm italic mb-1 text-gray-800 md:text-white md:drop-shadow">
                                Discover the Collection
                            </p>

                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-2
                                           text-gray-900 drop-shadow md:text-white md:drop-shadow-lg">
                                Smart Wearable
                            </h2>

                            <p className="text-xs sm:text-sm md:text-white md:drop-shadow text-gray-700">
                                Exclusive up to <span className="font-semibold">80% off</span>
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
