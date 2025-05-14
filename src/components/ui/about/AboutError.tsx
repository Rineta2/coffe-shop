import React from 'react'

export default function AboutError() {
    return (
        <section className="relative flex flex-col py-12 md:py-20 overflow-hidden min-h-full bg-[#FDF5E6]">
            <div className="container px-4 md:px-10 z-50">
                <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                    <div className="relative mb-6">
                        <svg
                            className="w-20 h-20 text-[#6F4E37]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#6F4E37] rounded-full flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#6F4E37] mb-3">
                        Cerita Kami Sedang Disiapkan
                    </h3>
                    <p className="text-[#8B7355] text-lg leading-relaxed">
                        Kami sedang menyusun cerita perjalanan kami dalam menyajikan kopi terbaik.
                        Silakan kembali sebentar lagi untuk mengetahui lebih banyak tentang passion kami dalam dunia kopi.
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-[#6F4E37]">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className="text-sm font-medium">Terima kasih telah tertarik dengan cerita kami</span>
                    </div>
                </div>
            </div>
        </section>
    )
} 