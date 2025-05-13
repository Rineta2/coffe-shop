"use client"

import React, { useState } from 'react'
import coffeImage from "@/base/assets/login.jpg"
import Image from 'next/image'
import { Label, TextInput, Button } from 'flowbite-react'
import { useAuth } from '@/utils/context/AuthContext'

export default function ForgotPasswordLayout() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await resetPassword(email)
        setLoading(false)
    }

    return (
        <section className="min-h-screen flex flex-col md:flex-row bg-[#181C23]">
            {/* Left: Forgot Password Form */}
            <div className="order-2 md:order-1 flex flex-col justify-center md:w-1/2 w-full px-8 md:px-24 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-semibold text-white mb-2">Forgot Password?</h1>
                    <p className="text-white/70 mb-8">Enter your email to reset your password</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" className="text-white/80">Your Email</Label>
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="mt-2"
                                color="gray"
                                shadow
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#FF8C4B] hover:bg-[#ff7a2a] text-white font-semibold text-lg py-2 rounded shadow"
                            disabled={loading}
                        >
                            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                        </Button>
                        <p className="text-white/70 text-sm text-center">
                            Remember your password? <a href="/signin" className="text-[#FF8C4B] hover:underline">Sign in here</a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 md:order-2 mb-4 md:mb-0 flex md:w-1/2 items-center justify-center bg-[#232733]">
                <div className="relative w-full h-full min-h-[450px] md:min-h-[500px]">
                    <Image src={coffeImage} alt="Forgot Password" layout="fill" objectFit="cover" className="rounded-l-3xl" />
                </div>
            </div>
        </section>
    )
} 