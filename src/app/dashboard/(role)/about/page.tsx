import React from 'react'

import { Metadata } from 'next'

import AboutLayout from "@/hooks/dashboard/about/AboutLayout"

export const metadata: Metadata = {
    title: 'Dashboard About | Coffe Street',
    description: 'Welcome to your dashboard about page',
}

export default function page() {
    return (
        <AboutLayout />
    )
}
