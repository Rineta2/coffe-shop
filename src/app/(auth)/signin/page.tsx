import React from 'react'

import type { Metadata } from 'next'

import SigninLayout from "@/hooks/(auth)/signin/SigninLayout"

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account'
}

export default function SignInPage() {
    return (
        <SigninLayout />
    )
}