import { motion } from "framer-motion";

import Image from "next/image";

import { ServiceCardProps } from "@/components/ui/service/types/service";

export default function ServiceCard({ product, index }: ServiceCardProps) {
    return (
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
    );
} 