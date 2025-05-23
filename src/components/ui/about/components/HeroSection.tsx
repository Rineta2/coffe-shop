import { motion } from "framer-motion";

import Image from "next/image";

import Link from 'next/link';

import { HeroSectionProps } from "@/components/ui/about/types/about";

export default function HeroSection({ aboutData }: HeroSectionProps) {
    return (
        <div className="container px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center z-50 gap-8 md:gap-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='w-full h-full z-50 relative max-w-[500px] mx-auto order-2 md:order-1'
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full aspect-[4/3] md:aspect-[3/4]"
                >
                    <Image
                        src={aboutData.image_url}
                        alt={aboutData.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 35vw"
                        priority
                        quality={90}
                    />
                </motion.div>
            </motion.div>

            <div className="text-center md:text-left space-y-4 sm:space-y-5 md:space-y-6 mb-6 md:mb-0 order-1 md:order-2">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold capitalize text-[#2f2105] leading-tight tracking-tight"
                    style={{
                        lineHeight: 1.2
                    }}>
                    {aboutData.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0"
                >
                    {aboutData.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 justify-center md:justify-start pt-2 sm:pt-3 md:pt-4"
                >
                    <Link
                        href={'#product'}
                        className="w-full sm:w-auto bg-[#2e2005] text-[#f5b027] px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 rounded-full flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:bg-[#3d2a0a] transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
                    >
                        Get your coffe
                    </Link>
                </motion.div>
            </div>
        </div>
    );
} 