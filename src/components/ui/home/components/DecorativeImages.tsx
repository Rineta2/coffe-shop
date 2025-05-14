import Image from "next/image"
import topImage from "@/base/assets/top.png"
import bottomImage from "@/base/assets/bottom.png"

export default function DecorativeImages() {
    return (
        <>
            <div className="absolute top-0 right-0 z-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-auto opacity-60 sm:opacity-80">
                <Image
                    src={topImage}
                    alt='top-image'
                    quality={100}
                    loading='lazy'
                    className="w-full h-auto"
                />
            </div>
            <div className="absolute bottom-0 left-0 z-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-auto opacity-60 sm:opacity-80">
                <Image
                    src={bottomImage}
                    alt='bottom-image'
                    quality={100}
                    loading='lazy'
                    className="w-full h-auto"
                />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#f3f3f3] via-[#f3f3f3]/70 to-transparent" />
        </>
    );
} 