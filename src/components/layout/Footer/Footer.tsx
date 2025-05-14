import React from 'react'
import Image from 'next/image'
import bg from "@/base/assets/footer.png"
import { Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className='py-6 md:py-10 pt-12 md:pt-20'>
            <div className="container mx-auto px-4 md:px-10">
                <div className='relative rounded-2xl md:rounded-3xl overflow-hidden'>
                    <Image src={bg} alt="footer" priority className='object-cover w-full h-full brightness-75' />
                    <div className='absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-6'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-center drop-shadow-lg max-w-2xl'>
                            Ikuti social media kami untuk informasi terbaru
                        </h1>

                        {/* Social Media Icons */}
                        <div className='flex gap-6 md:gap-10 mt-6 md:mt-10 mb-6 md:mb-10'>
                            <a href="https://www.facebook.com/rizki.ramadhan.419859" className='text-white hover:text-orange-400 transition-colors'>
                                <Facebook size={20} className='md:w-6 md:h-6' />
                            </a>
                            <a href="https://www.instagram.com/rzkir.20" className='text-white hover:text-orange-400 transition-colors'>
                                <Instagram size={20} className='md:w-6 md:h-6' />
                            </a>
                            <a href="https://www.youtube.com/@codingwithrizki" className='text-white hover:text-orange-400 transition-colors'>
                                <Youtube size={20} className='md:w-6 md:h-6' />
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className='mt-4 md:mt-6 text-white/80 text-xs md:text-sm text-center'>
                            © {new Date().getFullYear()} <a href="https://spacedigitalia.my.id" rel='noreferrer' className='hover:text-orange-400 transition-colors'>Space Digitalia</a>. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
