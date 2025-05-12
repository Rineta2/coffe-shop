import React from 'react'

import { Metadata } from 'next'

import CategoriesLayout from "@/hooks/dashboard/products/categories/CategoriesLayout"

export const metadata: Metadata = {
    title: 'Dashboard Products Categories',
    description: 'Welcome to your dashboard products categories page',
}

export default function page() {
    return (
        <CategoriesLayout />
    )
}
