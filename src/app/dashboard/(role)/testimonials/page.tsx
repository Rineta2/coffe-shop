import React from 'react'

import { Metadata } from 'next'

import TestimonialsLayout from "@/hooks/dashboard/testimonials/TestimonialsLayout"

export const metadata: Metadata = {
    title: 'Dashboard Testimonials | Coffe Street',
    description: 'Welcome to your dashboard Coffe Street page',
}

export default function page() {
    return (
        <TestimonialsLayout />
    )
}
