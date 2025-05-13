import React from 'react'
import Image from "next/image"
import { Product } from "@/components/ui/products/types/products"

export default function PopularProduct({ products }: { products: Product[] }) {
    // Sort products by rating in descending order and take only top 3
    const topThreeProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <div className='relative px-4 md:px-10 mt-32 md:mt-0'>
            {/* Popular Now Section */}
            <div className="container mx-auto">
                <div className="flex flex-row bg-[#F9D9AA] px-4 md:px-10 py-10 rounded-3xl gap-6 md:gap-10 overflow-x-auto md:overflow-visible scrollbar-hide md:scrollbar-default snap-x snap-mandatory md:snap-none">
                    {topThreeProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg md:-mt-36 p-4 md:p-5 min-w-[280px] md:min-w-0 md:w-full flex-shrink-0 md:flex-shrink flex flex-col items-center transition-transform hover:scale-105 snap-center">
                            <div className="relative mb-4 w-full max-w-[250px]">
                                <Image
                                    src={product.image_url}
                                    alt={product.title}
                                    width={250}
                                    height={250}
                                    className="rounded-xl w-full h-auto"
                                />
                                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow">
                                    {product.rating} <span className="text-yellow-400">★</span>
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center mb-1">
                                <h3 className="font-semibold text-base md:text-lg text-gray-800">{product.title}</h3>
                                <div className="font-bold text-base md:text-lg text-gray-900">{product.price} K</div>
                            </div>

                            <div className='flex justify-between items-center w-full mt-4'>
                                <div className="flex gap-2 mb-3 w-full">
                                    <span className="border border-orange-400 text-orange-400 rounded px-2 md:px-3 py-1 text-xs font-medium bg-orange-50">{product.categories}</span>
                                </div>

                                <button className="bg-orange-400 text-white rounded-full p-2 md:p-3 mt-auto shadow hover:bg-orange-500 transition-colors">
                                    <span role="img" aria-label="cart">🛒</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
