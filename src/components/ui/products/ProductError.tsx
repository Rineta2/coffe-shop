import React from 'react'

export default function ProductError() {
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
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 7v3m4-3v3m4-3v3"
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
                        Menu Belum Tersedia
                    </h3>
                    <p className="text-[#8B7355] text-lg leading-relaxed">
                        Maaf, kami sedang menyiapkan menu kopi terbaik kami.
                        Silakan kembali beberapa saat lagi untuk melihat pilihan kopi kami.
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
                        <span className="text-sm font-medium">Terima kasih atas kesabaran Anda</span>
                    </div>
                </div>
            </div>
        </section>
    )
} 