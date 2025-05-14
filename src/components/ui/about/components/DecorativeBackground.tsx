import { motion } from "framer-motion";
import Image from "next/image";
import bgImage from "@/base/assets/bg.png";

export default function DecorativeBackground() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 z-0 w-full h-full"
        >
            <Image
                src={bgImage}
                alt='top-image'
                quality={100}
                loading='lazy'
                className="w-full h-full object-cover brightness-90"
            />
        </motion.div>
    );
} 