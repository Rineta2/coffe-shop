"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Settings, Building2 } from 'lucide-react';

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

const menuItems = [
    {
        href: '/dashboard/admins',
        label: 'Dashboard',
        icon: Home
    },
    {
        href: '/dashboard/admins/users',
        label: 'Users',
        icon: Users
    },
    {
        href: '/dashboard/admins/properties',
        label: 'Properties',
        icon: Building2
    },
    {
        href: '/dashboard/admins/settings',
        label: 'Settings',
        icon: Settings
    }
];

export default function AdminHeader({ onSidebarToggle }: HeaderProps) {
    const pathname = usePathname();

    const isLinkActive = (href: string) => {
        if (href === '/dashboard/admins') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100">
                <Link href="/" className="flex items-center">
                    <span className="text-xl font-semibold text-gray-900">
                        Admin Dashboard
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-1.5">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                onClick={() => onSidebarToggle(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isLinkActive(item.href)
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isLinkActive(item.href) ? 'text-white' : 'text-gray-500'
                                    }`} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
} 