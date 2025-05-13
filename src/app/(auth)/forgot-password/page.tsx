import React from 'react'
import type { Metadata } from 'next'
import ForgotPasswordLayout from "@/hooks/(auth)/forgot-password/ForgotPasswordLayout"

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Reset your password'
}

export default function ForgotPasswordPage() {
    return (
        <ForgotPasswordLayout />
    )
} 