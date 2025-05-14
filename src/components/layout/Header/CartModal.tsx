import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { useCart } from '@/utils/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    const generateOrderId = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timestamp}-${random}`;
    };

    const handleWhatsAppCheckout = () => {
        const orderId = generateOrderId();
        const currentDate = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Format cart items into a message
        const itemsList = cartItems.map(item =>
            `- ${item.title} (${item.quantity}x) = ${item.price * item.quantity}K`
        ).join('\n');

        const message = `*Pesanan Baru* 🛍️\n\n` +
            `*ID Pesanan:* ${orderId}\n` +
            `*Tanggal:* ${currentDate}\n\n` +
            `*Detail Pesanan:*\n${itemsList}\n\n` +
            `*Total Items:* ${totalItems}\n` +
            `*Total Harga:* ${totalPrice}K\n\n` +
            `Terima kasih atas pesanannya! 🙏`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Replace with your WhatsApp number
        const whatsappNumber = "6281398632939"; // Ganti dengan nomor WhatsApp Anda

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200
                        }}
                        className="fixed right-0 top-0 h-full w-full md:max-w-md bg-white z-[101]"
                    >
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onClose}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-8"
                                    >
                                        <p className="text-gray-600 mb-4">Your cart is empty</p>
                                        <Link
                                            href="/"
                                            onClick={onClose}
                                            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#ff902a] to-[#ff6b2a] text-white font-medium hover:shadow-lg hover:shadow-[#ff902a]/20 transition-all duration-300"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl"
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0">
                                                    <Image
                                                        src={item.image_url}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                                    <p className="text-[#ff902a] font-bold">{item.price} K</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 rounded-full hover:bg-white transition-colors"
                                                        >
                                                            <Minus size={16} />
                                                        </motion.button>
                                                        <span className="w-8 text-center">{item.quantity}</span>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 rounded-full hover:bg-white transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <p className="text-gray-900 font-semibold">
                                                        {(item.price * item.quantity)} K
                                                    </p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {cartItems.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border-t border-gray-200 p-6 bg-white"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Total Items:</span>
                                        <span className="font-semibold">{totalItems}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-600">Total Price:</span>
                                        <span className="text-xl font-bold text-[#ff902a]">{totalPrice} K</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Continue Shopping
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleWhatsAppCheckout}
                                            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff902a] to-[#ff6b2a] text-white font-medium hover:shadow-lg hover:shadow-[#ff902a]/20 transition-all duration-300 text-center"
                                        >
                                            Checkout via WhatsApp
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
} 