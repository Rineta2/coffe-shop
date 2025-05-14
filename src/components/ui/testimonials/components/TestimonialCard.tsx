import { motion } from "framer-motion";

import Image from "next/image";

import { TestimonialCardProps } from "@/components/ui/testimonials/types/testimonials";

export default function TestimonialCard({ item, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center w-full"
        >
            <div className="relative w-full h-full">
                <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                >
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        quality={100}
                        width={500}
                        height={500}
                        className='w-60 h-60 lg:w-72 lg:h-72 object-contain'
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 bg-[#ffcb7d] px-4 py-3 rounded-md w-[85%] sm:w-auto"
                >
                    <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-1 text-start">{item.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base text-start line-clamp-3">{item.message}</p>
                </motion.div>
            </div>
        </motion.div>
    );
} 