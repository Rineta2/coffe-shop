import React from 'react'

export default function HomeSkelaton() {
    return (
        <>
            <section className="min-h-full sm:min-h-screen bg-[#f5eada] relative flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
                {/* Hero Section Skeleton */}
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-6 md:px-8 lg:px-12 z-50 gap-8 md:gap-12">
                    {/* Left Column - Text Content */}
                    <div className="text-center md:text-left space-y-4 sm:space-y-6 mb-6 sm:mb-8 md:mb-0">
                        {/* Title Skeleton */}
                        <div className="h-12 sm:h-14 md:h-16 lg:h-20 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="h-24 sm:h-28 md:h-32 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>

                        {/* Buttons Skeleton */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center md:justify-start pt-2 sm:pt-4">
                            <div className="w-full sm:w-40 h-12 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="w-24 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className='w-full h-[250px] sm:h-[350px] lg:h-[450px] z-50 relative'>
                        <div className="w-full h-full bg-gray-200 rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>

                {/* Decorative Images Skeleton */}
                <div className="absolute top-0 right-0 z-0 w-1/2 sm:w-1/3 md:w-auto opacity-60">
                    <div className="w-full h-64 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-1/2 sm:w-1/3 md:w-auto opacity-60">
                    <div className="w-full h-64 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* White gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#f3f3f3] via-[#f3f3f3]/70 to-transparent" />
            </section>

            {/* Popular Products Section Skeleton */}
            <div className='relative px-4 sm:px-6 md:px-10 mb-10 mt-10'>
                <div className="container">
                    <div className="flex flex-row bg-[#F9D9AA] px-4 sm:px-6 md:px-10 py-6 md:py-10 rounded-2xl md:rounded-3xl gap-4 md:gap-6 lg:gap-10 overflow-x-auto md:overflow-visible scrollbar-hide md:scrollbar-default snap-x snap-mandatory md:snap-none">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 flex flex-col min-w-[260px] sm:min-w-[280px] md:min-w-0 md:w-full flex-shrink-0 md:flex-shrink snap-center">
                                {/* Image Skeleton */}
                                <div className="relative w-full aspect-[3/2] mb-3 md:mb-4 overflow-hidden rounded-lg md:rounded-xl bg-gray-200">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Rating Skeleton */}
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl flex items-center shadow-md">
                                    <div className="h-4 w-12 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Category Skeleton */}
                                <div className='flex justify-end items-end mb-3 md:mb-4'>
                                    <div className='px-3 md:px-4 py-1 md:py-1.5 bg-gray-200 rounded-full h-6 w-20 relative overflow-hidden'>
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Title Skeleton */}
                                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 md:mb-3 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Price Skeleton */}
                                <div className="h-8 w-20 bg-gray-200 rounded mb-2 md:mb-3 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Description Skeleton */}
                                <div className="h-12 w-full bg-gray-200 rounded mb-14 md:mb-12 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Cart Button Skeleton */}
                                <div className="bottom-3 right-3 md:bottom-4 md:right-4 h-10 w-10 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}