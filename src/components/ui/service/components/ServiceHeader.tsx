import { motion } from "framer-motion";

export default function ServiceHeader() {
    return (
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
    );
} 