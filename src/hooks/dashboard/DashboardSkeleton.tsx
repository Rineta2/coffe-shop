import React from 'react'
import { HandPlatter, Home, Info, Users } from 'lucide-react'

export default function DashboardSkeleton() {
    return (
        <section>
            {/* Profile Card Skeleton */}
            <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-8 flex justify-between">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-50 shadow-xl bg-gray-200 relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2 relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-32 bg-gray-200 rounded-lg mb-2 relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 h-8 w-32 bg-gray-200 rounded-lg relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Charts Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4 relative">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg relative">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4 relative">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg relative">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Services Card Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <HandPlatter className="w-6 h-6 text-orange-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-orange-50 p-4 rounded-lg">
                                <div className="h-4 w-24 bg-gray-200 rounded-lg mb-2 relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-16 bg-gray-200 rounded-lg relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Home Content Card Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Home className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-blue-50 p-4 rounded-lg">
                                <div className="h-4 w-24 bg-gray-200 rounded-lg mb-2 relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-16 bg-gray-200 rounded-lg relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* About Content Card Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Info className="w-6 h-6 text-purple-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-purple-50 p-4 rounded-lg">
                                <div className="h-4 w-24 bg-gray-200 rounded-lg mb-2 relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-16 bg-gray-200 rounded-lg relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Card Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="w-6 h-6 text-green-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-green-50 p-4 rounded-lg">
                                <div className="h-4 w-24 bg-gray-200 rounded-lg mb-2 relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-16 bg-gray-200 rounded-lg relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Products Section Skeleton */}
            <div className="mt-8">
                <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4 relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-300 flex flex-col">
                            <div className="relative w-full aspect-[16/9] bg-gray-200">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="flex-1 flex flex-col p-4 pb-3">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="h-6 w-32 bg-gray-200 rounded-lg relative">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-16 bg-gray-200 rounded-lg relative">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-gray-200 rounded-lg mb-4 relative">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="flex justify-end mt-auto">
                                    <div className="h-4 w-20 bg-gray-200 rounded-lg relative">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 