import React, { useState, useEffect, useRef } from 'react'

import Logo from "@/base/assets/logo.webp"

import Image from 'next/image'

import Link from 'next/link'

import { navLink } from "@/components/layout/Header/data/Header"

import { ShoppingCart, Search, LogIn, Menu, X } from "lucide-react"

import { useAuth } from '@/utils/context/AuthContext'

import { supabase } from '@/utils/supabase/supabase'

import SearchModal from './SearchModal'

export default function Header() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<{ full_name: string; photo_url: string | null } | null>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('full_name, photo_url')
                    .eq('id', user.id)
                    .single();
                if (!error && data) {
                    setProfile({ full_name: data.full_name, photo_url: data.photo_url });
                }
            } else {
                setProfile(null);
            }
        };
        fetchProfile();
    }, [user]);

    // Close profile menu on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        }
        if (isProfileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 w-full z-[99] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <nav className="container mx-auto flex items-center justify-between gap-4 sm:gap-6 md:gap-8 py-3 px-4 md:px-10">
                    <Link href={"/"} className="flex items-center group">
                        <Image
                            src={Logo}
                            alt='logo'
                            quality={100}
                            loading='lazy'
                            className="w-20 h-20 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLink.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.path}
                                    className={`text-base font-medium transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#ff902a] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${idx === 0 ? 'text-[#ff902a] after:w-full' : 'text-gray-700 hover:text-[#ff902a]'}`}
                                >
                                    {item.name || item.deliver}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchModalOpen(true)}
                                className="p-1.5 sm:p-2 text-gray-700 hover:text-[#ff902a] transition-all duration-300 hover:scale-110 hover:bg-gray-100 rounded-full"
                            >
                                <Search size={20} className="sm:w-6 sm:h-6" />
                            </button>
                        </div>
                        <button className="p-1.5 sm:p-2 text-gray-700 hover:text-[#ff902a] hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110">
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </button>
                        {user && profile ? (
                            <div className="hidden md:flex items-center relative" ref={profileRef}>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff902a] to-[#ff6b2a] text-white font-medium hover:shadow-lg hover:shadow-[#ff902a]/20 transition-all duration-300 focus:outline-none hover:scale-105"
                                    onClick={() => setIsProfileMenuOpen((v) => !v)}
                                >
                                    {profile.photo_url ? (
                                        <Image src={profile.photo_url} alt={profile.full_name} width={32} height={32} className="rounded-full object-cover w-8 h-8 ring-2 ring-white/50" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-[#ff902a] font-bold text-lg ring-2 ring-white/50">
                                            {profile.full_name.charAt(0)}
                                        </div>
                                    )}
                                    <span className="ml-2 truncate max-w-[100px]">{profile.full_name}</span>
                                </button>
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-48 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                                        <Link href="/dashboard" className="block px-4 py-2.5 text-gray-700 hover:bg-[#ff902a]/10 hover:text-[#ff902a] transition-colors">
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-[#ff902a]/10 hover:text-[#ff902a] transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/signin"
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff902a] to-[#ff6b2a] text-white font-medium hover:shadow-lg hover:shadow-[#ff902a]/20 transition-all duration-300 hover:scale-105"
                            >
                                <LogIn className="w-6 h-6 md:w-7 md:h-7" />
                                <span>Login</span>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-700 hover:text-[#ff902a] hover:bg-gray-100 rounded-full transition-all duration-300"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed top-[72px] right-0 left-0 bg-white/95 backdrop-blur-lg z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                        }`}
                >
                    <div className="container mx-auto px-0 sm:px-4 py-6 sm:py-8 w-full">
                        <ul className="flex flex-col gap-2 sm:gap-4 w-full">
                            {navLink.map((item, idx) => (
                                <li key={idx} className="w-full">
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block w-full text-left text-lg sm:text-xl font-medium transition-all duration-300 px-4 py-3 rounded-lg ${idx === 0
                                            ? 'text-[#ff902a] bg-[#ff902a]/10'
                                            : 'text-gray-700 hover:text-[#ff902a] hover:bg-[#ff902a]/10'
                                            }`}
                                    >
                                        {item.name || item.deliver}
                                    </Link>
                                </li>
                            ))}
                            <li className="mt-4 w-full">
                                {user && profile ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsProfileMenuOpen((v) => !v)}
                                            className="flex items-center gap-2 text-lg sm:text-xl font-medium px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff902a] to-[#ff6b2a] text-white shadow-lg shadow-[#ff902a]/20 w-full"
                                        >
                                            {profile.photo_url ? (
                                                <Image src={profile.photo_url} alt={profile.full_name} width={32} height={32} className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-white/50" />
                                            ) : (
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 flex items-center justify-center text-[#ff902a] font-bold text-base sm:text-lg ring-2 ring-white/50">
                                                    {profile.full_name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="ml-2 truncate max-w-[100px]">{profile.full_name}</span>
                                        </button>
                                        {isProfileMenuOpen && (
                                            <div className="absolute left-0 right-0 mt-2 w-full bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => {
                                                        setIsProfileMenuOpen(false);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className="block px-4 py-2.5 text-gray-700 hover:bg-[#ff902a]/10 hover:text-[#ff902a] transition-colors"
                                                >
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        signOut();
                                                        setIsProfileMenuOpen(false);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-[#ff902a]/10 hover:text-[#ff902a] transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 text-lg sm:text-xl font-medium px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff902a] to-[#ff6b2a] text-white shadow-lg shadow-[#ff902a]/20 hover:shadow-xl hover:shadow-[#ff902a]/30 transition-all duration-300 w-full"
                                    >
                                        <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </>
    )
}
