import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from "@/hooks/dashboard/profile/ProfileLayout"

export const metadata: Metadata = {
    title: 'Dashboard Profile',
    description: 'Welcome to your dashboard profile page',
}

export default function page() {
    return (
        <ProfileLayout />
    )
}
