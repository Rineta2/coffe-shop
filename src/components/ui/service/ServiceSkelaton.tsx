import React from 'react'

export default function ServiceSkelaton() {
    return (
        <section className="xl:pt-[500px] py-6 md:py-10">
            <div className="container px-4 md:px-10">
                {/* Title Skeleton */}
                <div className="h-12 md:h-16 bg-gray-200 rounded-lg relative overflow-hidden mb-12 md:mb-24 w-3/4">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-4">
                            {/* Image Skeleton */}
                            <div className="relative w-full aspect-square max-w-[150px] md:max-w-[280px] bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Title Skeleton */}
                            <div className="h-7 bg-gray-200 rounded relative overflow-hidden mt-4 mb-2 w-3/4">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Description Skeleton */}
                            <div className="h-6 bg-gray-200 rounded relative overflow-hidden w-full">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}