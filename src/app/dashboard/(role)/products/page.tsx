import React from 'react'

import { Metadata } from 'next'

import ProductsLayout from "@/hooks/dashboard/products/products/ProductsLayout"

export const metadata: Metadata = {
    title: 'Dashboard Products',
    description: 'Welcome to your dashboard products page',
}

export default function page() {
    return (
        <ProductsLayout />
    )
}
