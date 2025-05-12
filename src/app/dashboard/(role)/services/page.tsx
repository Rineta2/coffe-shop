import React from 'react'

import { Metadata } from 'next'

import ServiceLayout from "@/hooks/dashboard/service/ServiceLayout"

export const metadata: Metadata = {
    title: 'Dashboard Service | Coffe Street',
    description: 'Welcome to your dashboard service page',
}

export default function page() {
    return (
        <ServiceLayout />
    )
}
