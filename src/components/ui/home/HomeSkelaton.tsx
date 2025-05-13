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
            <div className='relative px-4 md:px-10 mt-32 md:mt-0'>
                <div className="container mx-auto">
                    <div className="flex flex-row bg-[#F9D9AA] px-4 md:px-10 py-10 rounded-3xl gap-6 md:gap-10 overflow-x-auto md:overflow-visible">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg md:-mt-36 p-4 md:p-5 min-w-[280px] md:min-w-0 md:w-full flex-shrink-0 md:flex-shrink flex flex-col items-center">
                                {/* Image Skeleton */}
                                <div className="w-full max-w-[250px] h-[250px] bg-gray-200 rounded-xl relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Title and Price Skeleton */}
                                <div className="w-full flex justify-between items-center mb-1">
                                    <div className="h-6 w-24 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Tags Skeleton */}
                                <div className="flex gap-2 mb-3 w-full">
                                    <div className="h-6 w-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Button Skeleton */}
                                <div className="h-10 w-10 bg-gray-200 rounded-full relative overflow-hidden mt-auto">
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