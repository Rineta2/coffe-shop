"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';
import { motion } from "framer-motion";
import { Product } from "@/components/ui/products/types/products"
import Image from "next/image"
import { useState } from 'react';
import { usePagination } from '@/base/helper/pagination/usePagination';
import PaginationProducts from '@/components/ui/products/PaginationProducts';
import ProductSkelaton from "@/components/ui/products/ProductSkelaton"
import ProductError from "@/components/ui/products/ProductError"
import { useCart } from '@/utils/context/CartContext';

export default function ProductsList() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>({});
    const { addToCart } = useCart();
    const { data: products, loading, error } = FatchingTable<Product>({
        table: process.env.NEXT_PUBLIC_PRODUCTS as string,
    });

    const categories = products ? ['all', ...new Set(products.map(product => product.categories))] : ['all'];
    const sortedProducts = products ? [...products].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) : [];
    const filteredProducts = selectedCategory === 'all'
        ? sortedProducts
        : sortedProducts.filter(product => product.categories === selectedCategory);

    const {
        currentItems: paginatedProducts,
        pageCount,
        currentPage,
        handlePageChange,
    } = usePagination({
        items: filteredProducts,
        itemsPerPage: 6,
    });

    const handleAddToCart = async (product: Product) => {
        if (loadingItems[product.id]) return;

        setLoadingItems(prev => ({ ...prev, [product.id]: true }));
        try {
            await addToCart(product);
            // Add 5 second cooldown
            await new Promise(resolve => setTimeout(resolve, 2000));
        } finally {
            setLoadingItems(prev => ({ ...prev, [product.id]: false }));
        }
    };

    if (loading) {
        return <ProductSkelaton />
    }

    if (error) {
        return <ProductError />
    }

    return (
        <section className="min-h-full relative flex flex-col items-center justify-center py-16 md:py-20 overflow-hidden">
            <div className="container px-4 md:px-10">
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 md:mb-20 mb-10'>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-4xl font-bold mb-6 md:mb-0 capitalize"
                    >
                        Special menu <span className="relative inline-block">
                            <span className="z-10 relative">for you</span>
                            <span className="absolute left-0 right-0 bottom-0 h-1 bg-orange-400 rounded -z-10" style={{ height: '4px' }}></span>
                        </span>
                    </motion.h1>

                    <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide md:scrollbar-default snap-x snap-mandatory md:snap-none">
                        {categories.map((category, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full transition-colors capitalize text-base whitespace-nowrap flex-shrink-0 ${selectedCategory === category
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
                    {paginatedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col hover:-translate-y-1"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                                className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl"
                            >
                                <Image
                                    src={product.image_url}
                                    alt={product.title}
                                    className="rounded-xl object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    width={500}
                                    height={500}
                                    style={{ objectFit: 'cover' }}
                                />
                                {/* Rating badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center shadow-md text-sm font-semibold"
                                >
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span>{product.rating}</span>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.15 + 0.25 }}
                                className='flex justify-end items-end mb-4'
                            >
                                <span className='px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors'>{product.categories}</span>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                                className="text-xl font-bold text-gray-900 capitalize line-clamp-1 mb-3"
                            >
                                {product.title}
                            </motion.h3>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.15 + 0.35 }}
                                className="text-2xl font-extrabold text-orange-500 mb-3"
                            >
                                {product.price} K
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                                className="text-gray-600 text-sm mb-16 md:mb-12 line-clamp-2"
                            >
                                {product.description}
                            </motion.p>

                            {/* Cart button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.15 + 0.45 }}
                                className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3.5 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleAddToCart(product)}
                                disabled={loadingItems[product.id]}
                            >
                                {loadingItems[product.id] ? (
                                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.385a2.25 2.25 0 002.183 1.693h7.063a2.25 2.25 0 002.184-1.693l1.7-6.385m-15.217 0h15.217" />
                                    </svg>
                                )}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <PaginationProducts
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        </section>
    );
} 