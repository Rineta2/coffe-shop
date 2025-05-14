import { motion } from "framer-motion";

export default function TestimonialsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='flex flex-col justify-center h-full pt-6 md:pt-10 w-full sm:w-1/2'
        >
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900"
            >
                What they say about us
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-500 text-base sm:text-lg"
            >
                We always provide the best service and always maintain the quality of coffee
            </motion.p>
        </motion.div>
    );
} 