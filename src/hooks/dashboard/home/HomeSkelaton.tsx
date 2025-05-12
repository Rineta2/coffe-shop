import React from 'react'

export default function HomeSkelaton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-300 py-10">
            <div className='flex flex-col md:flex-row items-center'>
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full md:w-1/2">
                    <div className="w-full h-full bg-gray-100 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:w-1/2">
                    <div className="space-y-6">
                        {/* Title Skeleton */}
                        <div className="h-10 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-4 w-4/6 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Action Buttons Skeleton */}
                        <div className="flex justify-end gap-3 pt-6">
                            <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}