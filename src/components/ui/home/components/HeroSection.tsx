import Image from "next/image"

import Link from 'next/link';

import { motion } from "framer-motion";

import { HeroSectionProps } from "@/components/ui/home/types/home"

export default function HeroSection({ homeData }: HeroSectionProps) {
    return (
        <div className="container mx-auto flex flex-col xl:grid xl:grid-cols-2 items-center px-4 sm:px-6 md:px-8 lg:px-12 z-50 gap-6 md:gap-8 lg:gap-12">
            <div className="text-center xl:text-left space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 xl:mb-0">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold capitalize text-[#2f2105] leading-tight tracking-tight"
                    style={{
                        lineHeight: 1.2
                    }}>
                    {homeData.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto xl:mx-0">
                    {homeData.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 justify-center xl:justify-start pt-2 sm:pt-3 md:pt-4"
                >
                    <Link
                        href={'#product'}
                        className="w-full sm:w-auto bg-[#2f2105] text-white px-5 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 rounded-full flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:bg-[#3d2a0a] transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
                    >
                        Order now
                        <span className='p-1 sm:p-1.5 rounded-full bg-[#ff902a] text-white transform hover:rotate-12 transition-transform' role="img" aria-label="cart">🛒</span>
                    </Link>

                    <a href="#" className="text-orange-400 font-semibold hover:text-orange-500 transition-colors duration-300 hover:underline text-sm sm:text-base">More menu</a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='w-full xl:max-w-none h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] z-50 relative group'
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f5eada]/20 to-transparent rounded-2xl transform transition-transform duration-500 group-hover:scale-105"></div>
                <Image
                    src={homeData.image_url}
                    alt={homeData.title}
                    className="object-contain xl:object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                />
            </motion.div>
        </div>
    );
} 