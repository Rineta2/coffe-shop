"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';

import { Testimonials } from "@/components/ui/testimonials/types/testimonials"

import TestimonialsSkelaton from "@/components/ui/testimonials/TestimonialsSkelaton"

import TestimonialError from "@/components/ui/testimonials/TestimonialError"

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import TestimonialsHeader from '@/components/ui/testimonials/components/TestimonialsHeader';

import TestimonialCard from '@/components/ui/testimonials/components/TestimonialCard';

import TestimonialsBackground from '@/components/ui/testimonials/components/TestimonialsBackground';

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
                    <TestimonialsHeader />

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
                                <TestimonialCard item={item} index={idx} />
                            </SwiperSlide>
                        ))}
                        <div className="custom-swiper-pagination mt-6 sm:mt-8 flex justify-center gap-2" />
                    </Swiper>
                </div>
            </div>

            <TestimonialsBackground />
        </section>
    );
} 