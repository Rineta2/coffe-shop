"use client"

import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { supabase } from '@/utils/supabase/supabase'
import { Product } from '@/components/ui/products/types/products'
import { HandPlatter, Home, Info, Users, UserCog } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/utils/context/AuthContext'

import DashboardSkeleton from "@/hooks/dashboard/DashboardSkeleton"

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

interface Service {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

interface HomeContent {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

interface AboutContent {
    id: string;
    title: string;
    description: string;
    text: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

interface Testimonial {
    id: string;
    name: string;
    message: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    photo_url?: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [homeContent, setHomeContent] = useState<HomeContent[]>([])
    const [aboutContent, setAboutContent] = useState<AboutContent[]>([])
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile
                if (user?.id) {
                    const { data: profileData, error: profileError } = await supabase
                        .from(process.env.NEXT_PUBLIC_PROFILES as string)
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    if (profileError) throw profileError
                    setProfile(profileData)
                }

                // Fetch products
                const { data: productsData, error: productsError } = await supabase
                    .from(process.env.NEXT_PUBLIC_PRODUCTS as string)
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6)

                if (productsError) throw productsError
                setProducts(productsData || [])

                // Fetch services
                const { data: servicesData, error: servicesError } = await supabase
                    .from(process.env.NEXT_PUBLIC_SERVICE as string)
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6)

                if (servicesError) throw servicesError
                setServices(servicesData || [])

                // Fetch home content
                const { data: homeData, error: homeError } = await supabase
                    .from(process.env.NEXT_PUBLIC_HOME as string)
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6)

                if (homeError) throw homeError
                setHomeContent(homeData || [])

                // Fetch about content
                const { data: aboutData, error: aboutError } = await supabase
                    .from(process.env.NEXT_PUBLIC_ABOUT as string)
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6)

                if (aboutError) throw aboutError
                setAboutContent(aboutData || [])

                // Fetch testimonials
                const { data: testimonialsData, error: testimonialsError } = await supabase
                    .from(process.env.NEXT_PUBLIC_TESTIMONIALS as string)
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6)

                if (testimonialsError) throw testimonialsError
                setTestimonials(testimonialsData || [])
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user?.id])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Process data for category distribution
    const categoryData = {
        labels: Array.from(new Set(products.map(product => product.categories))),
        datasets: [
            {
                data: Array.from(new Set(products.map(product => product.categories))).map(
                    category => products.filter(product => product.categories === category).length
                ),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
            },
        ],
    }

    // Process data for price ranges
    const priceRanges = {
        labels: ['0-50K', '51-100K', '101-150K', '151-200K', '200K+'],
        datasets: [
            {
                label: 'Number of Products',
                data: [
                    products.filter(p => p.price <= 50).length,
                    products.filter(p => p.price > 50 && p.price <= 100).length,
                    products.filter(p => p.price > 100 && p.price <= 150).length,
                    products.filter(p => p.price > 150 && p.price <= 200).length,
                    products.filter(p => p.price > 200).length,
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    }

    if (loading) {
        return (
            <DashboardSkeleton />
        )
    }

    return (
        <section>
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-300 p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-indigo-50 shadow-xl">
                            {profile?.photo_url ? (
                                <Image
                                    src={profile.photo_url}
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                    <UserCog className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                            {profile?.full_name || 'User'}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 mb-2">{profile?.email}</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-50 text-indigo-700">
                            {profile?.role || 'User'}
                        </div>
                    </div>
                </div>

                <div className="text-xl sm:text-2xl font-mono font-bold text-gray-800">
                    {currentTime.toLocaleTimeString('en-US', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* Product Categories Chart */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-300">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Product Categories Distribution</h2>
                    <div className="h-[250px] sm:h-[300px]">
                        <Pie data={categoryData} />
                    </div>
                </div>

                {/* Price Ranges Chart */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-300">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Product Price Ranges</h2>
                    <div className="h-[250px] sm:h-[300px]">
                        <Bar data={priceRanges} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Services Card */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-300">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold">Services Overview</h2>
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <HandPlatter className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-orange-600 mb-1">Total Services</h3>
                            <p className="text-xl sm:text-2xl font-bold text-orange-700">{services.length}</p>
                        </div>

                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-orange-600 mb-1">Latest Service</h3>
                            <p className="text-base sm:text-lg font-semibold text-orange-700 truncate">
                                {services[0]?.title || 'No services yet'}
                            </p>
                        </div>

                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-orange-600 mb-1">Last Updated</h3>
                            <p className="text-base sm:text-lg font-semibold text-orange-700">
                                {services[0]?.updated_at ? new Date(services[0].updated_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Home Content Card */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-300">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold">Home Content Overview</h2>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Total Sections</h3>
                            <p className="text-xl sm:text-2xl font-bold text-blue-700">{homeContent.length}</p>
                        </div>

                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Latest Section</h3>
                            <p className="text-base sm:text-lg font-semibold text-blue-700 truncate">
                                {homeContent[0]?.title || 'No content yet'}
                            </p>
                        </div>

                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Last Updated</h3>
                            <p className="text-base sm:text-lg font-semibold text-blue-700">
                                {homeContent[0]?.updated_at ? new Date(homeContent[0].updated_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* About Content Card */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-300">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold">About Content Overview</h2>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-purple-600 mb-1">Total Sections</h3>
                            <p className="text-xl sm:text-2xl font-bold text-purple-700">{aboutContent.length}</p>
                        </div>

                        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-purple-600 mb-1">Latest Section</h3>
                            <p className="text-base sm:text-lg font-semibold text-purple-700 truncate">
                                {aboutContent[0]?.title || 'No content yet'}
                            </p>
                        </div>

                        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-purple-600 mb-1">Last Updated</h3>
                            <p className="text-base sm:text-lg font-semibold text-purple-700">
                                {aboutContent[0]?.updated_at ? new Date(aboutContent[0].updated_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Testimonials Card */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-300">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold">Testimonials Overview</h2>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-green-600 mb-1">Total Testimonials</h3>
                            <p className="text-xl sm:text-2xl font-bold text-green-700">{testimonials.length}</p>
                        </div>

                        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-green-600 mb-1">Latest Review</h3>
                            <p className="text-base sm:text-lg font-semibold text-green-700 truncate">
                                {testimonials[0]?.name || 'No testimonials yet'}
                            </p>
                        </div>

                        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-medium text-green-600 mb-1">Last Updated</h3>
                            <p className="text-base sm:text-lg font-semibold text-green-700">
                                {testimonials[0]?.updated_at ? new Date(testimonials[0].updated_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Products Section */}
            <div className="mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {products.slice(0, 6).map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-300 flex flex-col">
                            <div className="relative w-full aspect-[16/9] bg-gray-50">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover rounded-none"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-gray-400">No image</span>
                                    </div>
                                )}
                                {/* Rating badge */}
                                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow text-xs font-semibold text-gray-800">
                                    {product.rating}
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col p-3 sm:p-4 pb-2 sm:pb-3">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">{product.title}</h3>
                                    <span className="text-base sm:text-lg font-bold text-gray-900">{product.price} K</span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex justify-end mt-auto">
                                    <span className="text-xs sm:text-sm text-gray-500">{product.categories}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
