import React from 'react'

export default function TestimonialsSkelaton() {
    return (
        <section className="relative flex flex-col py-12 md:py-20 overflow-hidden min-h-full">
            <div className="container px-4 md:px-10 z-50">
                <div className='flex flex-col md:flex-row items-center gap-6 md:gap-8'>
                    <div className='flex flex-col justify-center h-full pt-6 md:pt-10 w-full sm:w-1/2'>
                        {/* Title Skeleton */}
                        <div className="h-12 md:h-16 bg-gray-200 rounded-lg relative overflow-hidden mb-3 md:mb-4">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        {/* Description Skeleton */}
                        <div className="h-6 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Testimonials Slider Skeleton */}
                    <div className='w-full h-full z-50'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col items-center w-full">
                                    <div className="relative w-full h-full">
                                        {/* Image Skeleton */}
                                        <div className="w-60 h-60 lg:w-72 lg:h-72 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>

                                        {/* Testimonial Card Skeleton */}
                                        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 bg-gray-200 px-4 py-3 rounded-md w-[85%] sm:w-auto">
                                            {/* Name Skeleton */}
                                            <div className="h-6 bg-gray-300 rounded relative overflow-hidden mb-2">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                                            </div>
                                            {/* Message Skeleton */}
                                            <div className="h-4 bg-gray-300 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination Skeleton */}
                        <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-3 w-3 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}