"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';
import { AboutProps } from "@/components/ui/about/types/about"
import AboutSkelaton from "@/components/ui/about/AboutSkelaton"
import AboutError from './AboutError';
import HeroSection from './components/HeroSection';
import DecorativeBackground from './components/DecorativeBackground';

export default function About() {
    const { data: about, loading, error } = FatchingTable<AboutProps>({
        table: process.env.NEXT_PUBLIC_ABOUT as string,
    });

    if (loading) {
        return <AboutSkelaton />
    }

    if (error) {
        return <AboutError />
    }

    const aboutData = about[0];

    return (
        <section className="min-h-full relative flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 overflow-hidden">
            <HeroSection aboutData={aboutData} />
            <DecorativeBackground />
        </section>
    );
} 