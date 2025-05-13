"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';

import { Home } from "@/components/ui/home/types/home"

import Image from "next/image"

import bottomImage from "@/base/assets/bottom.png"

import topImage from "@/base/assets/top.png"

import PopularProduct from "@/components/ui/home/PopularProduct"

import Link from 'next/link';

import HomeSkelaton from "@/components/ui/home/HomeSkelaton"

import { Product } from "@/components/ui/products/types/products"

export default function ProductsList() {
    const { data: home, loading: homeLoading, error: homeError } = FatchingTable<Home>({
        table: process.env.NEXT_PUBLIC_HOME as string,
    });

    const { data: products, loading: productsLoading, error: productsError } = FatchingTable<Product>({
        table: process.env.NEXT_PUBLIC_PRODUCTS as string,
    });

    if (homeLoading || productsLoading) {
        return <HomeSkelaton />;
    }

    if (homeError) {
        return <div>Error: {homeError.message}</div>;
    }

    if (productsError) {
        return <div>Error: {productsError.message}</div>;
    }

    const homeData = home[0];

    const sortedProducts = products ? [...products].sort((a, b) => b.rating - a.rating) : [];

    return (
        <>
            <section className="min-h-full sm:min-h-screen bg-[#f5eada] relative flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
                {/* Hero Section */}
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-6 md:px-8 lg:px-12 z-50 gap-8 md:gap-12">
                    <div className="text-center md:text-left space-y-4 sm:space-y-6 mb-6 sm:mb-8 md:mb-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold capitalize text-[#2f2105] leading-tight tracking-tight"
                            style={{
                                lineHeight: 1.2
                            }}>
                            {homeData.title}
                        </h1>

                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
                            {homeData.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center md:justify-start pt-2 sm:pt-4">
                            <Link
                                href={'#product'}
                                className="w-full sm:w-auto bg-[#2f2105] text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:bg-[#3d2a0a] transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
                            >
                                Order now
                                <span className='p-1 sm:p-1.5 rounded-full bg-[#ff902a] text-white transform hover:rotate-12 transition-transform' role="img" aria-label="cart">🛒</span>
                            </Link>

                            <a href="#" className="text-orange-400 font-semibold hover:text-orange-500 transition-colors duration-300 hover:underline text-sm sm:text-base">More menu</a>
                        </div>
                    </div>

                    <div className='w-full h-[250px] sm:h-[350px] lg:h-[450px] z-50 relative group'>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f5eada]/20 to-transparent rounded-2xl transform transition-transform duration-500 group-hover:scale-105"></div>
                        <Image
                            src={homeData.image_url}
                            alt={homeData.title}
                            className="object-contain md:object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                            priority
                        />
                    </div>
                </div>

                {/* Decorative Images */}
                <div className="absolute top-0 right-0 z-0 w-1/2 sm:w-1/3 md:w-auto opacity-60 sm:opacity-80 hover:opacity-100 transition-opacity duration-300">
                    <Image
                        src={topImage}
                        alt='top-image'
                        quality={100}
                        loading='lazy'
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="absolute bottom-0 left-0 z-0 w-1/2 sm:w-1/3 md:w-auto opacity-60 sm:opacity-80 hover:opacity-100 transition-opacity duration-300">
                    <Image
                        src={bottomImage}
                        alt='bottom-image'
                        quality={100}
                        loading='lazy'
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* White gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#f3f3f3] via-[#f3f3f3]/70 to-transparent" />
            </section>

            <PopularProduct products={sortedProducts} />
        </>
    );
} 