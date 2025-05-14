"use client"

import { FatchingTable } from '@/utils/lib/FatchingTable';
import { Service } from "@/components/ui/service/types/service"
import ServiceSkelaton from "@/components/ui/service/ServiceSkelaton"
import ServiceError from "@/components/ui/service/ServiceError"
import ServiceHeader from './components/ServiceHeader';
import ServiceCard from './components/ServiceCard';

export default function ProductsList() {
    const { data: products, loading, error } = FatchingTable<Service>({
        table: process.env.NEXT_PUBLIC_SERVICE as string,
    });

    if (loading) {
        return <ServiceSkelaton />
    }

    if (error) {
        return <ServiceError />
    }

    return (
        <section className="py-6 md:py-10" id="delivery">
            <div className="container px-4 md:px-10">
                <ServiceHeader />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <ServiceCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
} 