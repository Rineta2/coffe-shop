"use client"

import { createContext, useContext, useEffect, useState } from 'react'

import { User, Session } from '@supabase/supabase-js'

import { supabase } from '../supabase/supabase'

import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

import { AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: 'user', // Default role for new users
                    },
                },
            })

            if (error) {
                if (error.message.includes('already registered')) {
                    toast.error('This email is already registered. Please use a different email or try logging in.')
                } else {
                    toast.error(error.message)
                }
                return
            }

            toast.success('Account created successfully! Redirecting to login...', {
                duration: 2000,
            })

            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } catch {
            toast.error('An unexpected error occurred. Please try again.')
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    toast.error('Invalid email or password')
                } else if (error.message.includes('Email not confirmed')) {
                    toast.error('Please verify your email first')
                } else {
                    toast.error(error.message)
                }
                return
            }

            // Ambil id user dari Supabase Auth
            const userId = data.user?.id;

            // Query ke tabel profiles untuk ambil role
            const { data: userData, error: userError } = await supabase
                .from(process.env.NEXT_PUBLIC_PROFILES as string)
                .select('role')
                .eq('id', userId)
                .single();

            if (userError) {
                toast.error('Gagal mengambil data role user');
                return;
            }

            const userRole = userData?.role || 'user';

            toast.success('Login successful! Redirecting...', {
                duration: 2000,
            });

            setTimeout(() => {
                if (userRole === 'super-admins') {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }
            }, 2000);
        } catch {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Logged out successfully!', {
                duration: 2000,
            })

            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } catch {
            toast.error('An unexpected error occurred. Please try again.')
        }
    }

    const value = {
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}