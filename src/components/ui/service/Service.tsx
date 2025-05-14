"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';

import { Service } from "@/components/ui/service/types/service"

import Image from "next/image"

import ServiceSkelaton from "@/components/ui/service/ServiceSkelaton"

export default function ProductsList() {
    const { data: products, loading, error } = FatchingTable<Service>({
        table: process.env.NEXT_PUBLIC_SERVICE as string,
    });

    if (loading) {
        return <ServiceSkelaton />
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className="xl:pt-[500px] py-6 md:py-10">
            <div className="container px-4 md:px-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-12 md:mb-24 capitalize">
                    How to use delivery <span className="relative inline-block">
                        <span className="z-10 relative">service</span>
                        <span className="absolute left-0 right-0 bottom-0 h-1 bg-orange-400 rounded -z-10" style={{ height: '4px' }}></span>
                    </span>
                </h1>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col items-center justify-center p-4">
                            <div className="relative w-full aspect-square max-w-[150px] md:max-w-[280px]">
                                <Image
                                    src={product.image_url}
                                    alt={product.title}
                                    className="object-cover rounded-lg"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <h3 className="capitalize text-xl font-semibold mt-4 mb-2 text-center">{product.title}</h3>
                            <p className="capitalize text-lg text-gray-600 text-center">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 