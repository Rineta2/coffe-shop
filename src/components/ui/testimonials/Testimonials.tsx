"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';

import { Testimonials } from "@/components/ui/testimonials/types/testimonials"

import Image from "next/image"

import TestimonialsSkelaton from "@/components/ui/testimonials/TestimonialsSkelaton"

import bg from "@/base/assets/testi-bg.png"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import TestimonialError from "@/components/ui/testimonials/TestimonialError"

// Add custom styles for pagination
const customStyles = `
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #f7e9d2;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #ff9029;
  }
`;

export default function TestimonialsLayout() {
    const { data: testimonials, loading, error } = FatchingTable<Testimonials>({
        table: process.env.NEXT_PUBLIC_TESTIMONIALS as string,
    });

    if (loading) {
        return <TestimonialsSkelaton />
    }

    if (error) {
        return <TestimonialError />
    }

    return (
        <section className="relative flex flex-col py-12 md:py-20 overflow-hidden min-h-full">
            <style jsx global>{customStyles}</style>
            <div className="container px-4 md:px-10 z-50">
                <div className='flex flex-col md:flex-row items-center gap-6 md:gap-8'>
                    <div className='flex flex-col justify-center h-full pt-6 md:pt-10 w-full sm:w-1/2'>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">What they say about us</h1>
                        <p className="text-gray-500 text-base sm:text-lg">We always provide the best service and always maintain the quality of coffee</p>
                    </div>

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={16}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        pagination={{
                            clickable: true,
                            el: '.custom-swiper-pagination',
                            renderBullet: (index, className) => {
                                return `<span class="${className}"></span>`;
                            },
                        }}
                        modules={[Pagination]}
                        className='w-full h-full z-50'
                    >
                        {testimonials.map((item, idx) => (
                            <SwiperSlide
                                key={idx}
                                className="flex justify-center items-center text-center text-lg h-full"
                            >
                                <div className="flex flex-col items-center w-full">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.image_url}
                                            alt={item.name}
                                            quality={100}
                                            width={500}
                                            height={500}
                                            className='w-60 h-60 lg:w-72 lg:h-72 object-contain'
                                        />

                                        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 bg-[#ffcb7d] px-4 py-3 rounded-md w-[85%] sm:w-auto">
                                            <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-1 text-start">{item.name}</h3>
                                            <p className="text-gray-600 text-sm md:text-base text-start line-clamp-3">{item.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="custom-swiper-pagination mt-6 sm:mt-8 flex justify-center gap-2" />
                    </Swiper>
                </div>
            </div>

            <div className='absolute inset-0 h-full z-0'>
                <Image src={bg} alt='background' quality={100} />
            </div>

        </section>
    );
} 