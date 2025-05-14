"use client"

import React, { useState } from 'react'

import coffeImage from "@/base/assets/login.jpg"

import Image from 'next/image'

import { Label, TextInput, Checkbox, Button } from 'flowbite-react'

import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '@/utils/context/AuthContext'

export default function SigninLayout() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    })
    const { signIn } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await signIn(formData.email, formData.password)
        } catch (error) {
            console.error('Login failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="min-h-screen flex flex-col md:flex-row bg-[#181C23]">
            {/* Left: Login Form */}
            <div className="order-2 md:order-1 flex flex-col justify-center md:w-1/2 w-full px-8 md:px-24 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-semibold text-white mb-2">Good Morning!</h1>
                    <p className="text-white/70 mb-8">Thank you for coming back!</p>
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
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" className="text-white/80">Password</Label>
                            </div>
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="mt-2"
                                    color="gray"
                                    shadow
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-white/70 text-sm">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="text-[#FF8C4B] focus:ring-[#FF8C4B]"
                                />
                                <Label htmlFor="remember" className="text-white/80">Remember me</Label>
                            </div>
                            <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FF8C4B] hover:bg-[#ff7a2a] text-white font-semibold text-lg py-2 rounded shadow"
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </Button>
                        {/* <p className="text-white/70 text-sm text-center">
                            Don&apos;t have an account? <a href="/signup" className="text-[#FF8C4B] hover:underline">Sign up here</a>
                        </p> */}
                    </form>
                </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 md:order-2 mb-4 md:mb-0 flex md:w-1/2 items-center justify-center bg-[#232733]">
                <div className="relative w-full h-full min-h-[450px] md:min-h-[500px]">
                    <Image src={coffeImage} alt="Login" layout="fill" objectFit="cover" className="rounded-l-3xl" />
                </div>
            </div>
        </section>
    )
}
