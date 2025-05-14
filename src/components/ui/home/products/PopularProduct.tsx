import React, { useState } from 'react'

import Image from "next/image"

import { motion } from "framer-motion";

import { Product } from "@/components/ui/products/types/products"

import { useCart } from '@/utils/context/CartContext';

export default function PopularProduct({ products }: { products: Product[] }) {
    const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>({});
    const { addToCart } = useCart();

    const handleAddToCart = async (product: Product) => {
        if (loadingItems[product.id]) return;

        setLoadingItems(prev => ({ ...prev, [product.id]: true }));
        try {
            await addToCart(product);
            // Add 2 second cooldown
            await new Promise(resolve => setTimeout(resolve, 2000));
        } finally {
            setLoadingItems(prev => ({ ...prev, [product.id]: false }));
        }
    };

    const topThreeProducts = Array.isArray(products)
        ? [...products]
            .filter(product => product && product.image_url && product.title)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
        : [];

    return (
        <div className='relative px-4 sm:px-6 md:px-10 mb-10 mt-10'>
            <div className="container mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-[#2f2105] mb-6"
                >
                    Popular News
                </motion.h2>
                <div className="flex flex-row bg-[#F9D9AA] px-4 sm:px-6 md:px-10 py-6 md:py-10 rounded-2xl md:rounded-3xl gap-4 md:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scrollbar-hide lg:scrollbar-default snap-x snap-mandatory lg:snap-none lg:grid lg:grid-cols-3">
                    {topThreeProducts.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 flex flex-col hover:-translate-y-1 min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-0 flex-shrink-0 snap-center lg:snap-none"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                                className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg md:rounded-xl"
                            >
                                <Image
                                    src={product.image_url}
                                    alt={"product image"}
                                    fill
                                    className="rounded-lg md:rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                                    className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center shadow-md text-sm font-semibold"
                                >
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span>{product.rating}</span>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                                className='flex justify-end items-end mb-3'
                            >
                                <span className='px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors'>{product.categories}</span>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                                className="text-lg font-bold text-gray-900 capitalize line-clamp-1 mb-2"
                            >
                                {product.title}
                            </motion.h3>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                                className="text-xl font-extrabold text-orange-500 mb-2"
                            >
                                {product.price} K
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.6 }}
                                className="text-gray-600 text-sm mb-12 line-clamp-2"
                            >
                                {product.description}
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.2 + 0.7 }}
                                className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleAddToCart(product)}
                                disabled={loadingItems[product.id]}
                            >
                                {loadingItems[product.id] ? (
                                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.385a2.25 2.25 0 002.183 1.693h7.063a2.25 2.25 0 002.184-1.693l1.7-6.385m-15.217 0h15.217" />
                                    </svg>
                                )}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
