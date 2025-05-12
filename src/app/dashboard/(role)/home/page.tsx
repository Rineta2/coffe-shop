import React from 'react'

import { Metadata } from 'next'

import HomeLayout from "@/hooks/dashboard/home/HomeLayout"

export const metadata: Metadata = {
    title: 'Dashboard Home | Coffe Street',
    description: 'Welcome to your dashboard home page',
}

export default function page() {
    return (
        <HomeLayout />
    )
}
