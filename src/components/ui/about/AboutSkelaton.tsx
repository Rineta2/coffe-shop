import React from 'react'

export default function AboutSkelaton() {
    return (
        <section className="min-h-full relative flex flex-col items-center justify-center py-16 overflow-hidden">
            <div className="container px-4 md:px-10 grid grid-cols-2 items-center z-50 gap-6">
                {/* Image Skeleton */}
                <div className='w-full h-full z-50 relative max-w-[500px] mx-auto md:mx-0'>
                    <div className="w-full aspect-[4/3] md:aspect-[3/4] bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="text-center md:text-left space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-0">
                    {/* Title Skeleton */}
                    <div className="h-12 md:h-16 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-full">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-5/6">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-4/6">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 justify-center md:justify-start pt-2 sm:pt-3 md:pt-4">
                        <div className="w-full sm:w-auto h-10 bg-gray-200 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}