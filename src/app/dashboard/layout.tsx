"use client"

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/utils/context/AuthContext'

import { supabase } from '@/utils/supabase/supabase'

import { X } from 'lucide-react'

import Header from '@/components/layout/dashboard/Header'

import Sidebar from '@/components/layout/dashboard/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const renderSidebar = () => {
        return <Sidebar onSidebarToggle={setIsSidebarOpen} />
    }

    useEffect(() => {
        const checkRole = async () => {
            if (!loading) {
                // Check role
                const { data: userData, error: userError } = await supabase
                    .from(process.env.NEXT_PUBLIC_PROFILES as string)
                    .select('role')
                    .eq('id', user?.id)
                    .single()

                if (userError || userData?.role !== 'super-admins') {
                    router.push('/')
                    return
                }
            }
        }

        checkRole()
    }, [loading, router, user?.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8C4B]"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-30 w-80 h-screen transition-transform duration-300 ease-in-out bg-white border-r border-gray-100 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 lg:hidden"
                >
                    <X className="w-6 h-6" />
                </button>
                {renderSidebar()}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-80">
                {/* Header */}
                <Header onMenuClick={toggleSidebar} />

                {/* Page content */}
                <main className="flex-1 px-4 py-4 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
