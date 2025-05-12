import React from 'react'

import Logo from "@/base/assets/logo.webp"

import Image from 'next/image'

import Link from 'next/link'

import { navLink } from "@/components/layout/Header/data/Header"

import { ShoppingCart } from "lucide-react"

import { TextInput } from 'flowbite-react'

import { Search } from "lucide-react"

export default function Header() {
    return (
        <header className='sticky inset-0 w-full'>
            <nav className="container flex items-center justify-between gap-8 py-4 px-4 xl:px-8">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image src={Logo} alt='logo' quality={100} loading='lazy' className="w-14 h-14 object-contain" />
                    <span className="font-bold text-xl text-[#ff902a]">Cafe <span className="text-black font-normal">Street</span></span>
                </Link>

                <ul className="flex items-center gap-8 ml-8">
                    {navLink.map((item, idx) => (
                        <li key={idx}>
                            <Link
                                href={item.path}
                                className={`text-lg font-medium transition-colors duration-200 ${idx === 0 ? 'text-[#ff902a]' : 'text-black'} hover:text-[#ff902a]`}
                            >
                                {item.name || item.deliver}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <TextInput
                            type="text"
                            placeholder="Search your favorite coffee..."
                            className="rounded-full pl-10 pr-4 py-2.5 w-72 shadow-lg focus:ring-2 focus:ring-[#ff902a]/30 border-transparent border outline-none bg-white/90 backdrop-blur-sm transition-all duration-300"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff902a]" size={20} />
                    </div>
                    <ShoppingCart className="w-7 h-7 text-black hover:text-[#ff902a] cursor-pointer" />
                </div>
            </nav>
        </header>
    )
}
