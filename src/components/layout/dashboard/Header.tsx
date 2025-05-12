"use client"

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { User, LogOut, Menu } from 'lucide-react';

import { Avatar } from 'flowbite-react';

import { supabase } from '@/utils/supabase/supabase';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user, signOut } = useAuth();
    const [userRole, setUserRole] = useState<string>('');

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.id) {
                const { data, error } = await supabase
                    .from(process.env.NEXT_PUBLIC_PROFILES as string)
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (!error && data) {
                    setUserRole(data.role);
                }
            }
        };

        fetchUserRole();
    }, [user]);

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 text-gray-500 lg:hidden hover:text-gray-700 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            Hello, {user?.user_metadata?.full_name || 'User'}!
                        </h2>
                        <p className="text-sm text-gray-600 hidden sm:block">
                            Welcome back to your dashboard
                        </p>
                    </div>
                </div>

                {/* Right side - Profile and notifications */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Profile */}
                    <div className="flex items-center gap-2 lg:gap-3">
                        {user?.user_metadata?.avatar_url ? (
                            <Avatar img={user.user_metadata.avatar_url} alt="Profile" rounded size="sm" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary-600" />
                            </div>
                        )}
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[120px] lg:max-w-[200px]">
                                {user?.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{userRole || 'User'}</p>
                        </div>
                        <button
                            onClick={signOut}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
} 