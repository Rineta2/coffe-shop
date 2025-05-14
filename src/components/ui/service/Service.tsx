"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';
import { motion } from "framer-motion";
import { Service } from "@/components/ui/service/types/service"
import Image from "next/image"
import ServiceSkelaton from "@/components/ui/service/ServiceSkelaton"
import ServiceError from "@/components/ui/service/ServiceError"

export default function ProductsList() {
    const { data: products, loading, error } = FatchingTable<Service>({
        table: process.env.NEXT_PUBLIC_SERVICE as string,
    });

    if (loading) {
        return <ServiceSkelaton />
    }

    if (error) {
        return <ServiceError />
    }

    return (
        <section className="xl:pt-[500px] py-6 md:py-10">
            <div className="container px-4 md:px-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-12 md:mb-24 capitalize"
                >
                    How to use delivery <span className="relative inline-block">
                        <span className="z-10 relative">service</span>
                        <span className="absolute left-0 right-0 bottom-0 h-1 bg-orange-400 rounded -z-10" style={{ height: '4px' }}></span>
                    </span>
                </motion.h1>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                                className="relative w-full aspect-square max-w-[150px] md:max-w-[280px]"
                            >
                                <Image
                                    src={product.image_url}
                                    alt={product.title}
                                    className="object-cover rounded-lg"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                                className="capitalize text-xl font-semibold mt-4 mb-2 text-center"
                            >
                                {product.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                                className="capitalize text-lg text-gray-600 text-center"
                            >
                                {product.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 