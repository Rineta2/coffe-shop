import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { TextInput } from 'flowbite-react';
import { FatchingTable } from '@/utils/lib/FatchingTable';
import { Product } from '@/components/ui/products/types/products';
import Image from 'next/image';
import Link from 'next/link';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: products } = FatchingTable<Product>({
        table: process.env.NEXT_PUBLIC_PRODUCTS as string,
    });

    // Get unique categories from products
    const uniqueCategories = products ? [...new Set(products.map(product => product.categories))] : [];

    useEffect(() => {
        // Prevent scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const filteredProducts = products?.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categories.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-20">
            <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close search modal"
                >
                    <X size={24} />
                </button>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff902a]" size={20} />
                    <TextInput
                        type="text"
                        placeholder="Search your favorite coffee..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl shadow-lg focus:ring-2 focus:ring-[#ff902a]/30 border-transparent border outline-none bg-white/95"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {searchQuery ? (
                    <div className="mt-6 max-h-[60vh] overflow-y-auto">
                        {filteredProducts.length > 0 ? (
                            <div className="space-y-4">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                                        onClick={onClose}
                                    >
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={product.image_url}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{product.title}</h4>
                                            <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[#ff902a] font-semibold">{product.price} K</span>
                                                <span className="text-sm text-gray-500">•</span>
                                                <span className="text-sm text-gray-500">{product.categories}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No products found</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {uniqueCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSearchQuery(category)}
                                    className="px-4 py-2 bg-gray-100 hover:bg-[#ff902a]/10 text-gray-700 hover:text-[#ff902a] rounded-full transition-colors capitalize"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 