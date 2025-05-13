import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { TextInput } from 'flowbite-react';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

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
                    />
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Cappuccino', 'Latte', 'Espresso', 'Cold Brew', 'Mocha'].map((item) => (
                            <button
                                key={item}
                                className="px-4 py-2 bg-gray-100 hover:bg-[#ff902a]/10 text-gray-700 hover:text-[#ff902a] rounded-full transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 