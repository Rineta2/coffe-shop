import { motion } from "framer-motion";

import Image from "next/image";

import bg from "@/base/assets/testi-bg.png";

export default function TestimonialsBackground() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='absolute inset-0 h-full z-0'
        >
            <Image src={bg} alt='background' quality={100} />
        </motion.div>
    );
} 