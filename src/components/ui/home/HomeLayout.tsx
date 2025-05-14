"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';
import { Home } from "@/components/ui/home/types/home"
import { Product } from "@/components/ui/products/types/products"
import PopularProduct from "@/components/ui/home/products/PopularProduct"
import HomeSkelaton from "@/components/ui/home/HomeSkelaton"
import HomeError from "@/components/ui/home/HomeError"
import PopularProductError from "@/components/ui/home/products/PopularProductError"
import HeroSection from "./components/HeroSection"
import DecorativeImages from "./components/DecorativeImages"

export default function ProductsList() {
    const { data: home, loading: homeLoading, error: homeError } = FatchingTable<Home>({
        table: process.env.NEXT_PUBLIC_HOME as string,
    });

    const { data: products, loading: productsLoading, error: productsError } = FatchingTable<Product>({
        table: process.env.NEXT_PUBLIC_PRODUCTS as string,
    });

    if (homeLoading || productsLoading) {
        return <HomeSkelaton />;
    }

    if (homeError) {
        return <HomeError />
    }

    if (productsError) {
        return <PopularProductError />
    }

    const homeData = home[0];
    const sortedProducts = products ? [...products].sort((a, b) => b.rating - a.rating) : [];

    return (
        <>
            <section className="min-h-full xl:min-h-screen bg-[#f5eada] brightness-95 relative flex flex-col items-center justify-center py-44 overflow-hidden" id="home">
                <HeroSection homeData={homeData} />
                <DecorativeImages />
            </section>

            <PopularProduct products={sortedProducts} />
        </>
    );
} 