"use client"

import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function Slider() {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-11/12 md:w-10/12 mb-28"
        >
            <SwiperSlide>
                <div className="relative w-full h-[300px]">
                    {/* Background Image */}
                    <Image
                        src="/images/bg.jpg"
                        alt="Background Slide"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <Image
                        src="/images/watch.png"
                        alt="Overlay Slide"
                        width={230}
                        height={230}
                        className="absolute top-1/2 left-[70%] -translate-y-1/2 z-10"
                    />
                    <div className="absolute right-[50%] top-1/2 -translate-y-1/2 z-20 text-white max-w-md">
                        <p className="text-md mb-2">Best Deal Online smart Watches</p>
                        <h2 className="text-6xl font-extrabold mb-3">SMART WEARABLE</h2>
                        <p className="text-md">Up to 80% off</p>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="relative w-full h-[300px]">
                    {/* Background Image */}
                    <Image
                        src="/images/bg.jpg"
                        alt="Background Slide"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <Image
                        src="/images/watch.png"
                        alt="Overlay Slide"
                        width={230}
                        height={230}
                        className="absolute top-1/2 left-[70%] -translate-y-1/2 z-10"
                    />
                    <div className="absolute right-[50%] top-1/2 -translate-y-1/2 z-20 text-white max-w-md">
                        <p className="text-md mb-2 text-gray-50">Best Deal Online smart Watches</p>
                        <h2 className="text-5xl font-bold mb-3">SMART WEARABLE</h2>
                        <p className="text-md">Up to 80% off</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full h-[300px]">
                    {/* Background Image */}
                    <Image
                        src="/images/bg.jpg"
                        alt="Background Slide"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <Image
                        src="/images/watch.png"
                        alt="Overlay Slide"
                        width={230}
                        height={230}
                        className="absolute top-1/2 left-[70%] -translate-y-1/2 z-10"
                    />
                    <div className="absolute right-[50%] top-1/2 -translate-y-1/2 z-20 text-white max-w-md">
                        <p className="text-md mb-2">Best Deal Online smart Watches</p>
                        <h2 className="text-5xl font-bold mb-3">SMART WEARABLE</h2>
                        <p className="text-md">Up to 80% off</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}
