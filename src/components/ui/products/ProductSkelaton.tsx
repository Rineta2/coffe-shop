import React from 'react'

export default function ProductSkelaton() {
    return (
        <section className="min-h-full relative flex flex-col items-center justify-center py-16 md:py-20 overflow-hidden">
            <div className="container px-4 md:px-10">
                {/* Header Section Skeleton */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 md:mb-20 mb-10'>
                    {/* Title Skeleton */}
                    <div className="h-12 md:h-16 bg-gray-200 rounded-lg relative overflow-hidden w-3/4">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>

                    {/* Category Buttons Skeleton */}
                    <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-4 md:pb-0">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full flex-shrink-0 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="group relative bg-white rounded-2xl shadow-lg p-6 flex flex-col">
                            {/* Image Skeleton */}
                            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-gray-200">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                {/* Rating Badge Skeleton */}
                                <div className="top-4 left-4 h-8 w-20 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Category Badge Skeleton */}
                            <div className='flex justify-end items-end mb-4'>
                                <div className="h-8 w-24 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Title Skeleton */}
                            <div className="h-7 bg-gray-200 rounded-lg relative overflow-hidden mb-3 w-3/4">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Price Skeleton */}
                            <div className="h-8 bg-gray-200 rounded-lg relative overflow-hidden mb-3 w-1/3">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Description Skeleton */}
                            <div className="h-16 bg-gray-200 rounded-lg relative overflow-hidden mb-16 md:mb-12">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Cart Button Skeleton */}
                            <div className="bottom-4 right-4 h-12 w-12 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 w-10 bg-gray-200 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}